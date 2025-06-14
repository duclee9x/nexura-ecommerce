// workflow-data.ts
import { 
  type CreateOrderRequest,
} from '@nexura/grpc_gateway/protos';

/**
 * Core workflow data - stores only essential identifiers and status
 */
export interface WorkflowStateData {
  // Identity IDs
  orderId?:                       string;
  userId:                         string;
  cartId:                         string;
  reservationId?:                 string;
  paymentId?:                     string;
  gate_payment_completed_choice?: boolean;
  error?:                         string;
  [key: string]:                  any; // Allow additional properties
}

/**
 * Activity types enumeration
 */
export const ActivityType = {
  ACTIVITY: 'activity',
  EVENT:    'event',
  TIMER:    'timer'
} as const;

type ActivityType = typeof ActivityType[keyof typeof ActivityType];


/**
 * Workflow activity info class
 */
export class WorkflowActivityInfo {
  constructor(
    public activityName: string,
    public activityType: ActivityType,
    public startTime: string,
    public endTime: string
  ) {}

  toJSON() {
    return {
      activityName: this.activityName,
      activityType: this.activityType,
      startTime:    this.startTime,
      endTime:      this.endTime
    };
  }
}

/**
 * Main workflow data container with standardized structure
 */
export class WorkflowState {
  data:            WorkflowStateData;
  original:        WorkflowStateData;
  success:         boolean;
  activityHistory: WorkflowActivityInfo[];
  debugMode:       boolean;

  constructor(
    data: Partial<WorkflowStateData> = {}, 
    original: Partial<WorkflowStateData> = data,
    success: boolean = true,
    activityHistory: WorkflowActivityInfo[] = [],
    debugMode: boolean = process.env.DEBUG === 'true'
  ) {
    // Initialize with default values
    this.data = data as WorkflowStateData;
    this.original = original as WorkflowStateData;
    this.success = success;
    this.activityHistory = activityHistory;
    this.debugMode = debugMode;
  }

  static createWorkflowState(data: Partial<CreateOrderRequest> = {}): WorkflowState {
    return new WorkflowState(data);
  }

  static fromInput(input: string | Partial<CreateOrderRequest>): WorkflowState {
    if (!input) {
      return new WorkflowState();
    }

    let inputObj: Partial<CreateOrderRequest>;
    if (typeof input === 'string') {
      try {
        inputObj = JSON.parse(input);
      } catch (e) {
        console.error('Error parsing workflow state JSON:', e);
        return new WorkflowState();
      }
    } else {
      inputObj = input;
    }

    return new WorkflowState(
      inputObj,
      inputObj,
      true,
      [],
      process.env.DEBUG === 'true'
    );
  }

  addToActivityHistory(activityName: string, activityType: ActivityType, activityResponse: Partial<WorkflowStateData>): void {
    if (this.debugMode) {
      const startTimeFormatted = activityResponse.startTimeFormatted || 
        (activityResponse.startTime ? new Date(activityResponse.startTime).toISOString() : null);
      
      const endTimeFormatted = activityResponse.endTimeFormatted || 
        (activityResponse.endTime ? new Date(activityResponse.endTime).toISOString() : null);
      
      if (startTimeFormatted && endTimeFormatted) {
        const activityInfo = new WorkflowActivityInfo(
          activityName, 
          activityType, 
          startTimeFormatted,
          endTimeFormatted
        );
        
        this.activityHistory.push(activityInfo);
      }
    }
  }

  addActivityResponse(activityName: string, activityResponse: Partial<WorkflowStateData>): WorkflowState {
    this.addToActivityHistory(activityName, ActivityType.ACTIVITY, activityResponse);
    return this;
  }

  addEventResponse(eventName: string, eventEndTime: Date, eventData: any = {}): WorkflowState {
    const endTimeMs = eventEndTime instanceof Date ? eventEndTime.getTime() : eventEndTime;
    
    this.addToActivityHistory(eventName, ActivityType.EVENT, {
      endTime: endTimeMs,
      success: true,
      error:   undefined
    });
    
    if (eventData && Object.keys(eventData).length > 0) {
      this.data = { ...this.data, ...eventData };
    }
    
    return this;
  }

  addTimerResponse(timerName: string, timerEndTime: Date): WorkflowState {
    const endTimeMs = timerEndTime instanceof Date ? timerEndTime.getTime() : timerEndTime;
    
    this.addToActivityHistory(timerName, ActivityType.TIMER, {
      endTime: endTimeMs,
      success: true,
      error:   undefined
    });
    
    return this;
  }

  forContinueAsNewWorkflow(): WorkflowState {
    return new WorkflowState(
      { ...this.data },
      { ...this.original },
      true,
      [],
      this.debugMode
    );
  }

  getActivityRequestData(): WorkflowStateData {
    return { ...this.data };
  }

  getBool(key: string, defaultVal: boolean = false): boolean {
    if (key in this.data && typeof this.data[key] === 'boolean') {
      return this.data[key] as boolean;
    }
    
    if (key in this.original && typeof this.original[key] === 'boolean') {
      return this.original[key] as boolean;
    }
    
    return defaultVal;
  }
}

/**
 * Represents the result of a workflow execution.
 */
export class WorkflowResult {
  constructor(
    public success: boolean = true,
    public data: Partial<WorkflowStateData> = {},
    public activityHistory: WorkflowActivityInfo[] = []
  ) {}

  static fromWorkflowState(workflowState: WorkflowState): WorkflowResult {
    return new WorkflowResult(
      workflowState.success,
      { ...workflowState.data },
      [...workflowState.activityHistory]
    );
  }

  toJSON() {
    return {
      success:         this.success,
      data:            this.data,
      activityHistory: this.activityHistory.map(info => 
        info.toJSON ? info.toJSON() : info
      )
    };
  }
}

export class ActivityResponse {
  constructor(
    public success: boolean = true,
    public data: Partial<WorkflowStateData> = {},
    public error: string | null = null,
    public startTime: number = Date.now(),
    public endTime: number | null = null,
    public startTimeFormatted: string | null = null,
    public endTimeFormatted: string | null = null
  ) {}

  toJSON() {
    return {
      success:            this.success,
      data:               this.data,
      error:              this.error,
      startTime:          this.startTime,
      endTime:            this.endTime,
      startTimeFormatted: this.startTimeFormatted,
      endTimeFormatted:   this.endTimeFormatted
    };
  }
}
// For backward compatibility
export const createWorkflowState = WorkflowState.createWorkflowState; 
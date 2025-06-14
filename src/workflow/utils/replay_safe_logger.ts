/**
 * ReplaySafeLogger class that provides logging methods
 * Can work both with and without workflow context
 */

/**
 * Log levels type
 */
export const LogLevel = {
  DEBUG: 'DEBUG',
  INFO:  'INFO',
  WARN:  'WARN',
  ERROR: 'ERROR'
} as const;

export type LogLevelType = typeof LogLevel[keyof typeof LogLevel];

/**
 * Workflow context interface
 */
export interface IWorkflowContext {
  instanceId?: string;
  isReplaying(): boolean;
}

/**
 * Logger options interface
 */
export interface ILoggerOptions {
  showTimestamp?: boolean;
  instanceId?:    string;
  service?:       string;
}

/**
 * Console function type
 */
type ConsoleFn = typeof console.log | typeof console.error | typeof console.warn | typeof console.debug;

class ReplaySafeLogger {
  private context: IWorkflowContext | null;
  private options: Required<ILoggerOptions>;

  /**
   * @param context - Optional workflow context object
   * @param options - Logger options
   */
  constructor(
    context: IWorkflowContext | null = null,
    options: ILoggerOptions = {}
  ) {
    this.context = context;
    this.options = {
      showTimestamp: true,
      instanceId:    context?.instanceId || '',
      service:       '',
      ...options
    };
  }

  /**
   * Checks if logging should be suppressed due to replay
   * @private
   * @returns True if logging should be suppressed
   */
  private _shouldSuppressLogging(): boolean {
    return this.context?.isReplaying() === true;
  }

  /**
   * Format the log message with timestamp and level
   * @private
   * @param level - Log level
   * @param args - Arguments to log
   * @returns Formatted arguments
   */
  private _formatMessage(level: LogLevelType, args: unknown[]): unknown[] {
    const parts: string[] = [];
    
    if (this.options.showTimestamp) {
      const timestamp = new Date().toISOString();
      parts.push(`[${timestamp}]`);
    }

    parts.push(`[${level}]`);

    if (this.options.service) {
      parts.push(`[${this.options.service}]`);
    }

    if (this.options.instanceId) {
      parts.push(`[${this.options.instanceId}]`);
    }

    const prefix = parts.join(' ');
    
    // If the first argument is a string, prepend our prefix to it
    if (typeof args[0] === 'string') {
      return [ prefix + ' ' + args[0], ...args.slice(1) ];
    }
    
    // Otherwise, add prefix as a separate argument
    return [ prefix, ...args ];
  }

  /**
   * Generic logging method
   * @private
   * @param level - Log level
   * @param consoleFn - Console function to use
   * @param args - Arguments to log
   */
  private _log(level: LogLevelType, consoleFn: ConsoleFn, ...args: unknown[]): void {
    if (!this._shouldSuppressLogging()) {
      consoleFn.apply(console, this._formatMessage(level, args));
    }
  }

  /**
   * Log debug level message
   * @param args - Arguments to pass to console.debug
   */
  debug(...args: unknown[]): void {
    this._log(LogLevel.DEBUG, console.debug, ...args);
  }

  /**
   * Log info level message
   * @param args - Arguments to pass to console.log
   */
  info(...args: unknown[]): void {
    this._log(LogLevel.INFO, console.log, ...args);
  }

  /**
   * Log warning level message
   * @param args - Arguments to pass to console.warn
   */
  warn(...args: unknown[]): void {
    this._log(LogLevel.WARN, console.warn, ...args);
  }

  /**
   * Log error level message
   * @param args - Arguments to pass to console.error
   */
  error(...args: unknown[]): void {
    this._log(LogLevel.ERROR, console.error, ...args);
  }

  /**
   * Alias for info method to maintain compatibility
   * @param args - Arguments to pass to console.log
   */
  log(...args: unknown[]): void {
    this.info(...args);
  }
}

/** 
 * Creates a logger instance that can be used with or without workflow context
 * @param context - Optional workflow context object
 * @param options - Logger options
 * @returns A logger instance
 */
function getLogger(
  context: IWorkflowContext | null = null,
  options: ILoggerOptions = {}
): ReplaySafeLogger {
  return new ReplaySafeLogger(context, options);
}

/** 
 * Creates a logger instance specifically for workflow context
 * @param context - Workflow context object
 * @param options - Logger options
 * @returns A replay-safe logger instance
 */
function getReplaySafeLogger(
  context: IWorkflowContext,
  options: ILoggerOptions = {}
): ReplaySafeLogger {
  return new ReplaySafeLogger(context, options);
}

export { ReplaySafeLogger, getLogger, getReplaySafeLogger };
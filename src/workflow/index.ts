/**
 * daprOrderProcessingWorkflow - Main Entry Point
 *
 * This file sets up and starts the Dapr workflow application.
 * It registers the workflow and activities with the Dapr runtime,
 * and provides a minimal HTTP server for health checks.
 */

import express from "express";
import { WorkflowRuntime } from "@dapr/dapr";
import { orderProcessingWorkflow } from "./workflow/workflow";
import { registerActivities } from "./activities/index";

// Configuration
const APP_PORT = process.env.APP_PORT || 8166;
const APP_NAME = "orderProcessingWorkflow";

// Initialize Express app for minimal endpoints
const app = express().disable("x-powered-by");
app.use(express.json());

// Initialize Dapr workflow runtime
const workflowRuntime = new WorkflowRuntime();

// Register workflow and activities
workflowRuntime.registerWorkflow(orderProcessingWorkflow);
registerActivities(workflowRuntime);

// Basic API endpoints
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ service: APP_NAME, status: "running", version: "1.0.0" });
});

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Start the workflow runtime
async function start() {
  try {
    await workflowRuntime.start();
    console.log("Workflow runtime started");

    // Start the Express server
    app.listen(APP_PORT, () => {
      console.log(`Server running on port ${APP_PORT}`);
      console.log(`Workflow ${APP_NAME} registered and ready`);
      console.log("Use Dapr Workflow API to interact with workflows:");
      console.log(
        `  POST /v1.0/workflows/dapr/${APP_NAME}/start - Start a new workflow`
      );
      console.log(
        `  GET  /v1.0/workflows/dapr/<instance-id> - Get workflow status`
      );
    });
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}

// Handle shutdown signals
const signals = ["SIGINT", "SIGTERM"];

signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log(`${signal} received, shutting down...`);
    try {
      console.log("Stopping workflow runtime...");
      await workflowRuntime.stop();
      console.log("Application shutdown complete");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });
});

// Start the application
console.log("Starting application...");
start().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

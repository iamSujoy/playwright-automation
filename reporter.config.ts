import { OrtoniReportConfig } from "ortoni-report";
import * as os from "os";


export const reportConfig: OrtoniReportConfig = {
    open: process.env.CI ? "never" : "never",
    folderPath: "otorni-report",
    filename: "index.html",
    title: "Ortoni Automation Test Report",
    showProject: false,
    projectName: "E-CommerceAutomationExercise",
    testType: "Automation",
    authorName: os.userInfo().username,
    base64Image: false,
    stdIO: false,
    meta: {
        "Test Cycle": new Date().getMonth() + 1 + "/" + new Date().getFullYear(),
        version: "4",
        description: "E-Commerce AutomationExercise Automation Suite",
        release: "0.1",
        platform: os.type(),
    },
};
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.FinanceToDo.com",
  appName: "FinanceToDo",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;

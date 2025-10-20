import LaunchDarkly from "launchdarkly-node-server-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = LaunchDarkly.init(process.env.LD_SDK_KEY);

async function main() {
  await client.waitForInitialization();
  console.log("LaunchDarkly client initialized");

  const user = {
    key: "example-user-key",
    name: "Venki",
  };

  const flagKey = "enable-new-feature";
  const showFeature = await client.variation(flagKey, user, false);

  if (showFeature) {
    console.log("✅ New feature is ENABLED for this user");
  } else {
    console.log("❌ New feature is DISABLED for this user");
  }

  await client.flush();
  client.close();
}

main();

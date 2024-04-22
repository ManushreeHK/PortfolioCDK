import { Stack, StackProps } from "aws-cdk-lib";
import { CodePipelineSource, ShellStep, CodePipeline } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const pipeline = new CodePipeline(this, `CodePipeline`, {
        crossAccountKeys: true,
        selfMutation: true,
        synth: new ShellStep("Synth", {
          input: CodePipelineSource.connection("ManushreeHK/PortfolioCDK", "main", {
            connectionArn:
              "arn:aws:codestar-connections:us-east-1:905418415909:connection/477bea1b-c6b3-4dfd-a2cb-78850acb64f6",
          }),
          commands: ["npm install", "npm ci", "npm run build", "npx cdk synth"],
        }),
      }); 
  }
}

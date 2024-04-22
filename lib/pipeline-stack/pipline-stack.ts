import { Environment, Stack, StackProps, Stage, StageProps } from "aws-cdk-lib";
import { CodePipelineSource, ShellStep, CodePipeline } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { SnsStack } from "../sns-stack/sns-stack";


const accounts = [
    {
      account: "471112839043",
      stage: "prod",
      region: "us-east-1",
    },
    // {
    //   account: "147866640792",
    //   stage: "stage",
    //   region: "us-east-1",
    // },
  ];

  export interface CdkStackProps extends StageProps {
    stageName: string;
  }

  class PipelineStages extends Stage {
    constructor(scope: Construct, id: string, props?: CdkStackProps) {
      super(scope, id, props);
      
      new SnsStack(this, `SnsStack-${props?.env?.account}`);

    }
  }

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
      
      accounts.forEach((account) => {
        pipeline.addStage(
          new PipelineStages(this, `${account.stage}`, {
            stageName: account.stage,
            env: {account: account.account, region: account.region}
          })
        );
      });
      pipeline.buildPipeline();

  }
}

import { Stack } from "aws-cdk-lib";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Construct } from "constructs";


export class SnsStack extends Stack {
    constructor(scope: Construct, id: string) {
    super(scope, id);
    new Topic(this, "Topic", {
      topicName: "TestTopic",
    })
  } 
}
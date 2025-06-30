import { NotepadText, TrendingUp } from "lucide-react";
import { Heading } from "@/components/blocks/heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/ui";
import { formatCriterionName, getScoreProps } from "../helpers";
import type { AnalysisResult as AnalysisResultType, Criterion } from "../types";

type AnalysisResultProps = {
  result: AnalysisResultType;
};

export const AnalysisResult = ({ result }: AnalysisResultProps) => {
  const overallScoreProps = getScoreProps(result.overallScore);
  return (
    <>
      <div className="flex flex-col gap-2">
        <Heading
          title="Overall analysis"
          description="Overall resume match analysis and recommendations."
          icon={<TrendingUp className="size-5" />}
        />
      </div>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <CardTitle className="flex flex-col gap-4">
            <div className="flex gap-4 w-full items-center">
              <div className="text-foreground flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <overallScoreProps.Icon className={cn("size-5", overallScoreProps.text)} />
                  <span className="whitespace-nowrap">{result?.finalRecommendation}</span>
                </div>
                <Badge className={cn("text-sm", overallScoreProps.paper)}>{result.overallScore} / 100</Badge>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Progress value={result?.overallScore} className={cn("w-full", overallScoreProps.progress)} />
            </div>
          </CardTitle>
          <div className="text-sm">{result.overallComment}</div>
        </CardContent>
      </Card>
      <Heading
        title="Criteria-based analysis"
        description="Analysis of the resume against each criteria."
        icon={<NotepadText className="size-5" />}
        className="mt-2"
      />
      <Tabs defaultValue={Object.keys(result.criteria)[0]}>
        <div className="grid grid-cols-4 gap-4">
          <TabsList className="flex flex-col h-fit gap-1 col-span-1 w-full">
            {Object.keys(result.criteria).map((key) => (
              <TabsTrigger key={key} value={key} className="w-full">
                <div className="flex w-full gap-2 items-center py-1 justify-between">
                  {formatCriterionName(key)}
                  <Badge className={cn("text-sm", getScoreProps(result.criteria[key as Criterion].score * 25).paper)}>
                    {result.criteria[key as Criterion].score} / 4
                  </Badge>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(result.criteria).map(([key, value]) => (
            <TabsContent key={key} value={key} asChild>
              <Card className="col-span-3">
                <CardContent className="flex flex-col gap-4">
                  <CardTitle className="flex items-center gap-2 justify-between">
                    {formatCriterionName(key)}
                    <Badge className={cn("text-sm", getScoreProps(value.score * 25).paper)}>{value.score} / 4</Badge>
                  </CardTitle>
                  <Progress
                    value={value.score * 25}
                    className={cn("w-full", getScoreProps(value.score * 25).progress)}
                  />
                  <div className="text-sm">{value.comment}</div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </>
  );
};

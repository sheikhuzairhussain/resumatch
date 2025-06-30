import { Loader2, TrendingUp, WandSparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SidebarProps = {
  onAnalyze: (resume: File, jobDescription: File) => void;
  isPending: boolean;
};

export const Sidebar = ({ onAnalyze, isPending }: SidebarProps) => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(resume && jobDescription)) {
      return;
    }
    onAnalyze(resume, jobDescription);
  };

  const isButtonDisabled = isPending || !(resume && jobDescription);

  return (
    <Card className="flex-1">
      <CardContent className="flex-1 flex flex-col justify-between h-fit">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-foreground rounded-full flex items-center justify-center">
              <TrendingUp className="size-4 text-background" />
            </div>
            <h1 className="text-2xl tracking-tight font-light">Resumatch</h1>
          </div>
          <div className="text-sm">
            AI-powered resume analysis that matches the given resume against job descriptions to give you insights for
            your career growth.
          </div>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <Label>Resume</Label>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                className="cursor-pointer"
                disabled={isPending}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Job description</Label>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setJobDescription(e.target.files?.[0] ?? null)}
                className="cursor-pointer"
                disabled={isPending}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isButtonDisabled} className="cursor-pointer">
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <WandSparkles className="size-4" />
                    Analyze
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="text-muted-foreground flex justify-center text-xs">
          <span>
            Made with ❤️ by{" "}
            <a href="https://github.com/sheikhuzairhussain" className="underline">
              Sheikh Uzair Hussain
            </a>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

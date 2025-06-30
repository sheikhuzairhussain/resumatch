import { api } from "@/utils/api";
import { AnalysisResult } from "./components/analysis-result";
import { ErrorComponent } from "./components/error";
import { Initial } from "./components/initial";
import { Loading } from "./components/loading";
import { Sidebar } from "./components/sidebar";
import { readFileAsDataURL } from "./helpers";

export const AnalyzeResume = () => {
  const { data, mutate: checkCandidateAlignment, isPending, error } = api.ai.analyzeResume.useMutation();

  const onAnalyze = async (resume: File, jobDescription: File) => {
    const resumeData = await readFileAsDataURL(resume);
    const jobDescriptionData = await readFileAsDataURL(jobDescription);

    checkCandidateAlignment({
      resumePdf: resumeData,
      jobDescriptionPdf: jobDescriptionData,
    });
  };

  return (
    <div className="flex h-full bg-muted p-2 overflow-clip">
      <div className="flex grow gap-2">
        <Sidebar onAnalyze={onAnalyze} isPending={isPending} />
        {!data && (
          <div className="flex-3 flex p-4 items-center justify-center border-dashed border-4 rounded-2xl">
            {isPending ? (
              <Loading />
            ) : error ? (
              <ErrorComponent
                title="An error occurred while analyzing your resume."
                description="Please try again later."
              />
            ) : (
              <Initial />
            )}
          </div>
        )}
        {data && (
          <div className="flex-3 p-4 gap-4 flex flex-col max-h-full">
            <AnalysisResult result={data} />
          </div>
        )}
      </div>
    </div>
  );
};

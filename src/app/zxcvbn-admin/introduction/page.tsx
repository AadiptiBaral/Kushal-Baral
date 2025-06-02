import { fetchInstruction } from "@/lib/fetchData";
import FirstInstruction from "@/components/admin/introduction/FirstIntroduction"
import UpdateIntroduction from "@/components/admin/introduction/UpdateIntroduction";

async function page() {
  const introductionData = await fetchInstruction();
  
const introduction = introductionData
    ? JSON.parse(JSON.stringify(introductionData))
    : null;
 
  return (
    <>
      {introduction ? (
        <UpdateIntroduction initialData={introduction} />
      ) : (
        <FirstInstruction />
      )}
    </>
  );
}

export default page;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";


export function useUpdateSetting(){
    const queryclient=useQueryClient();
const {mutate: updateSetting, isLoading: isUpdating}=useMutation({
  mutationFn: updateSettingApi,
  onSuccess: ()=>{
    toast.success("Setting successfully edited");
    queryclient.invalidateQueries({queryKey: ['settings']});
  }, 
  onError: (err)=>{
    toast.error(err.message);
  }
})

return {updateSetting, isUpdating};
}
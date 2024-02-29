import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";


export function useEditCabin(){
    const queryclient=useQueryClient();
const {mutate: editCabin, isLoading: isEditing}=useMutation({
  mutationFn: ({newCabinData, id})=>createEditCabin(newCabinData, id),
  onSuccess: ()=>{
    toast.success("Cabin successfully edited");
    queryclient.invalidateQueries({queryKey: ['cabins']});
  }, 
  onError: (err)=>{
    toast.error(err.message);
  }
})

return {editCabin, isEditing};
}
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";


function CreateCabinForm() {
  const queryclient=useQueryClient();
  const {formState, register, handleSubmit, reset, getValues}=useForm();
  const {errors}=formState;
  console.log(errors);


  const {mutate, isLoading: isCreating}=useMutation({
    mutationFn: createCabin,
    onSuccess: ()=>{
      toast.success("New Cabin Succesfully Created");
      queryclient.invalidateQueries({queryKey: ['cabins']});
      reset();
    },
    onError: (err)=>{
      toast.error(err.message);
    }
  })

  function onSubmit(data){
    mutate({...data, image: data.image[0]});
    // console.log(data.image[0].name);
  }
  function onError(error){
    console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

<FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          // disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          // disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          // disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          // disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          // disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type='file'
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button >
          Add Cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

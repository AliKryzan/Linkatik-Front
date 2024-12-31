import React from "react"
import { Calendar } from "@mantine/dates"
import { useFormContext } from "react-hook-form"

const CalenderForm = () => {
  const form = useFormContext()
  //   const {
  //     field,
  //     fieldState: { invalid, isTouched, isDirty },
  //     formState: { touchedFields, dirtyFields }
  //   } = useController({
  //     name,
  //     control,
  //     rules: { required: true },
  //   });
  return (
    <div>
      <Calendar
      // getDayProps={(date) => ({
      //   selected: selected.some((s) => dayjs(date).isSame(s, "date")),
      //   onClick: () => handleSelect(date),
      // })}
      />
    </div>
  )
}

export default CalenderForm

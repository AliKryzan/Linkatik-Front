import { Button, Select, Stack, Text, Textarea, TextInput, Notification } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getData } from "country-list"

import { cn } from "@/lib/utils"

const ContactForm = ({ block, className }) => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  
  // Get country data from the country-list package
  const countryData = getData()
  const countries = Object.entries(countryData).map(([code, name]) => ({
    value: code,
    label: name
  }))
  
  // Create a dynamic validation schema based on which fields are enabled and required
  const createValidationSchema = () => {
    const schema = {}
    
    if (block.settings?.name?.enabled) {
      schema.name = block.settings.name.required 
        ? z.string().min(1, { message: "Name is required" })
        : z.string().optional()
    }
    
    if (block.settings?.email_from?.enabled) {
      schema.email_from = block.settings.email_from.required 
        ? z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" })
        : z.string().email({ message: "Invalid email format" }).optional()
    }
    
    if (block.settings?.phone?.enabled) {
      schema.phone = block.settings.phone.required 
        ? z.string().min(1, { message: "Phone number is required" })
        : z.string().optional()
    }
    
    if (block.settings?.country?.enabled) {
      schema.country = block.settings.country.required 
        ? z.string().min(1, { message: "Country is required" })
        : z.string().optional()
    }
    
    if (block.settings?.message?.enabled) {
      schema.message = block.settings.message.required 
        ? z.string().min(1, { message: "Message is required" })
        : z.string().optional()
    }
    
    return z.object(schema)
  }
  
  const form = useForm({
    resolver: zodResolver(createValidationSchema())
  })
  
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Form data submitted:", data)
      
      // Simulate a successful submission
      setSubmitted(true)
      setError(null)
      form.reset()
      
      // Reset the success message after 5 seconds
    } catch (err) {
      setError("There was an error submitting the form. Please try again.")
      console.error("Form submission error:", err)
    }
  })

  return (
    <Stack
      gap="xl"
      component={"form"}
      className={cn("link-preview contact-form", className)}
      onSubmit={onSubmit}>
      <Text ta={"center"}>{block.title}</Text>

      <Stack>
        {block.settings?.name?.enabled && (
          <Controller
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <TextInput
                variant="filled"
                required={block.settings.name.required}
                placeholder="اسمك"
                {...field}
              />
            )}
          />
        )}
        {block.settings?.email_from?.enabled && (
          <Controller
            control={form.control}
            name={"email_from"}
            render={({ field }) => (
              <TextInput
                type="email"
                variant="filled"
                required={block.settings.email_from.required}
                placeholder="example@example.com"
                {...field}
              />
            )}
          />
        )}
        {block.settings?.phone?.enabled && (
          <Controller
            control={form.control}
            name={"phone"}
            render={({ field }) => (
              <TextInput
                variant="filled"
                required={block.settings.phone.required}
                placeholder="رقم الهاتف"
                {...field}
              />
            )}
          />
        )}
        {block.settings?.country?.enabled && (
          <Controller
            control={form.control}
            name={"country"}
            render={({ field }) => (
              <Select
                variant="filled"
                required={block.settings.country.required}
                data={countries}
                placeholder="اختر دولة"
                error={form.formState.errors.country?.message}
                {...field}
              />
            )}
          />
        )}
        {block.settings?.message?.enabled && (
          <Controller
            control={form.control}
            name={"message"}
            render={({ field }) => (
              <Textarea
                rows={4}
                placeholder="الرسالة"
                variant="filled"
                required={block.settings.message.required}
                {...field}
              />
            )}
          />
        )}
      </Stack>
      <Stack>
        <Text size="sm" ta={"center"}>
          {block.settings?.footer_text || "By submitting your contact details, you are providing your data who may contact you."}
        </Text>
        
        {submitted && (
          <Notification color="green" title="Success" onClose={() => setSubmitted(false)}>
            {block.settings?.thank_you_message || "Thank you for your message. We'll get back to you soon."}
          </Notification>
        )}
        
        {error && (
          <Notification color="red" title="Error" onClose={() => setError(null)}>
            {error}
          </Notification>
        )}
        
        <Button type="submit" color={block.settings?.button_color || "gray"} loading={form.formState.isSubmitting}>
          {block.settings?.button_text || "Send"}
        </Button>
      </Stack>
    </Stack>
  )
}

export default ContactForm

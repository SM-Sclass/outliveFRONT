"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FormData } from "../health-assessment-form"

// Update the component to accept and handle the isReadOnly prop
export function PersonalInfoStep({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name", { required: "Name is required" })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(123) 456-7890"
            {...register("phone", { required: "Phone number is required" })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="(123) 456-7890"
            {...register("address", { required: "address  is required" })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="eg: 30"
            {...register("age", { required: "Age is required" })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.age && <p className="text-sm text-destructive mt-1">{errors.age.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input
            id="gender"
            type="text"
            placeholder="Gender"
            {...register("gender", { required: "Gender is required" })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.gender && <p className="text-sm text-destructive mt-1">{errors.gender.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Input
            id="bloodGroup"
            type="text"
            placeholder="Blood Group"
            {...register("blood_group", { required: "Blood group is required" })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.blood_group && <p className="text-sm text-destructive mt-1">{errors.blood_group.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            placeholder="Height"
            {...register("height", { required: "Height is required" })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.height && <p className="text-sm text-destructive mt-1">{errors.height.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Weight"
            {...register("weight", { required: "Weight is required" })}
            disabled={isReadOnly}
            className={isReadOnly ? "bg-muted" : ""}
          />
          {errors.weight && <p className="text-sm text-destructive mt-1">{errors.weight.message}</p>}
        </div>
        

      </div>

      {isReadOnly && (
        <p className="text-sm text-muted-foreground italic">
          This information is read-only. To make changes, click the Edit Assessment button.
        </p>
      )}
    </div>
  )
}
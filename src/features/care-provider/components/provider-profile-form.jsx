"use client";

import { useState } from "react";
import { Camera, FileUp, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerSchema } from "./schemas/providerSchema";
import { LocalizedTextField } from "@/components/shared/localized-text-field";
import { LocalizedText } from "@/components/shared/localized-text";
import { CatalogMultiSelect } from "@/components/shared/catalog-multi-select";
import { emptyLocalizedText } from "@/lib/localized-text";
import {
  CREDENTIALS,
  DELIVERY_MODES,
  SERVICE_TYPES,
  SPECIALTIES,
  activeOnly,
  getServiceType,
} from "@/lib/catalogs";

const ACTIVE_SERVICE_TYPES = activeOnly(SERVICE_TYPES);

export function ProviderProfileForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      firstName: "Sarah",
      lastName: "Johnson",
      title: "dr",
      specialtyIds: ["family-medicine", "general-practice"],
      credentialIds: ["md"],
      deliveryModeIds: ["in-person", "virtual"],
      bio: {
        ...emptyLocalizedText(),
        en: "Board-certified family medicine physician with over 15 years of experience. Passionate about preventive care and building lasting patient relationships.",
        es: "Médica de familia certificada con más de 15 años de experiencia. Apasionada por el cuidado preventivo y por construir relaciones duraderas con sus pacientes.",
      },
      services: [
        {
          typeId: "in-person-visit",
          customName: "",
          description: {
            ...emptyLocalizedText(),
            en: "Comprehensive yearly check-up including vitals, labs review, and lifestyle counseling.",
            es: "Examen anual completo con signos vitales, revisión de laboratorios y orientación de estilo de vida.",
          },
        },
      ],
      virtualRate: 120,
      inPersonRate: 150,
      acceptPatients: true,
      duration: "30",
      buffer: "10",
      bankName: "Chase Bank",
      accountNumber: "••••••4567",
      routingNumber: "••••••1234",
      payoutFrequency: "weekly",
    },
  });
  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({ control, name: "services" });
  const watchedServices = watch("services");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data) {
    setIsLoading(true);
    console.log("PROVIDER DATA:", data);

    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      {/* Photo & basic */}
      <Card>
        <CardHeader>
          <CardTitle>Photo & Basic Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar className="size-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"
                >
                  <Camera className="size-3.5 text-muted-foreground" />
                </button>
              </div>
              <div className="grid gap-1">
                <Button type="button" variant="outline" size="sm">
                  Upload photo
                </Button>
                <p className="text-xs text-muted-foreground">
                  A professional photo builds trust with patients.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>First name</Label>
                <Input {...register("firstName")} className="h-10" />
                {errors.firstName && (
                  <p className="text-xs text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label>Last name</Label>
                <Input {...register("lastName")} className="h-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Title</Label>
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr">Dr.</SelectItem>
                        <SelectItem value="mr">Mr.</SelectItem>
                        <SelectItem value="ms">Ms.</SelectItem>
                        <SelectItem value="mrs">Mrs.</SelectItem>
                        <SelectItem value="np">NP</SelectItem>
                        <SelectItem value="pa">PA</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Specialties</Label>
                <Controller
                  control={control}
                  name="specialtyIds"
                  render={({ field }) => (
                    <CatalogMultiSelect
                      catalog={SPECIALTIES}
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Pick one or more specialties…"
                    />
                  )}
                />
                {errors.specialtyIds && (
                  <p className="text-xs text-destructive">
                    {errors.specialtyIds.message}
                  </p>
                )}
              </div>
            </div>
            <Controller
              control={control}
              name="bio"
              render={({ field }) => (
                <LocalizedTextField
                  label="Bio"
                  description="Tell visitors about yourself. Required in your default language; add other languages so service users see your bio in their own language."
                  value={field.value}
                  onChange={field.onChange}
                  rows={4}
                  minLength={10}
                  placeholder="Board-certified family medicine physician with…"
                />
              )}
            />
            {errors.bio?.en && (
              <p className="text-xs text-destructive">{errors.bio.en.message}</p>
            )}
            <div className="grid gap-1.5">
              <Label>Languages</Label>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">
                  English{" "}
                  <button className="ml-1">
                    <Trash2 className="size-3" />
                  </button>
                </Badge>
                <Badge variant="secondary">
                  Spanish{" "}
                  <button className="ml-1">
                    <Trash2 className="size-3" />
                  </button>
                </Badge>
                <Button type="button" variant="outline" size="xs">
                  <Plus className="size-3" /> Add
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services with localized descriptions, catalog-driven type, and
          admin-constrained custom names. */}
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>
            Pick a service type from the platform catalog. Types marked
            "custom" let you give your own name within the admin-set length
            cap; standard types use the catalog label automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {serviceFields.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No services yet. Add one below.
              </p>
            ) : null}
            {serviceFields.map((field, index) => {
              const typeId = watchedServices?.[index]?.typeId;
              const type = typeId ? getServiceType(typeId) : null;
              const allowsCustom = !!type?.customAllowed;
              const maxLength = type?.customMaxLength ?? 200;
              return (
                <div
                  key={field.id}
                  className="grid gap-4 rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 grid gap-1.5">
                      <Label>Service type</Label>
                      <Controller
                        control={control}
                        name={`services.${index}.typeId`}
                        render={({ field: typeField }) => (
                          <Select
                            onValueChange={typeField.onChange}
                            value={typeField.value}
                          >
                            <SelectTrigger className="h-10 w-full">
                              <SelectValue placeholder="Pick a service type…" />
                            </SelectTrigger>
                            <SelectContent>
                              {ACTIVE_SERVICE_TYPES.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  <LocalizedText value={s.label} />
                                  {s.customAllowed ? (
                                    <span className="ml-1 text-xs text-muted-foreground">(custom name allowed)</span>
                                  ) : null}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.services?.[index]?.typeId && (
                        <p className="text-xs text-destructive">
                          {errors.services[index].typeId.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeService(index)}
                      aria-label="Remove service"
                    >
                      <Trash2 className="size-4 text-muted-foreground" />
                    </Button>
                  </div>

                  {allowsCustom && (
                    <div className="grid gap-1.5">
                      <Label>Custom service name</Label>
                      <Input
                        {...register(`services.${index}.customName`)}
                        maxLength={maxLength}
                        placeholder="e.g. Annual Wellness Visit"
                        className="h-10"
                      />
                      <p className="text-xs text-muted-foreground">
                        Up to {maxLength} characters (admin limit).
                      </p>
                    </div>
                  )}

                  <Controller
                    control={control}
                    name={`services.${index}.description`}
                    render={({ field: descriptionField }) => (
                      <LocalizedTextField
                        label="Description"
                        description="Explain what's included. Visitors using a different language will see the closest translation, falling back to your default."
                        value={descriptionField.value}
                        onChange={descriptionField.onChange}
                        rows={3}
                        minLength={5}
                      />
                    )}
                  />
                  {errors.services?.[index]?.description?.en && (
                    <p className="text-xs text-destructive">
                      {errors.services[index].description.en.message}
                    </p>
                  )}
                </div>
              );
            })}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="justify-self-start"
              onClick={() =>
                appendService({
                  typeId: "",
                  customName: "",
                  description: emptyLocalizedText(),
                })
              }
            >
              <Plus className="size-4" />
              Add service
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Credentials & delivery modes — dynamic from admin catalogs. */}
      <Card>
        <CardHeader>
          <CardTitle>Credentials & Delivery</CardTitle>
          <CardDescription>
            Pick the credentials you hold and the modes in which you deliver
            care. Options come from the platform catalog so new credentials or
            modes appear here automatically once an admin adds them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Credentials</Label>
              <Controller
                control={control}
                name="credentialIds"
                render={({ field }) => (
                  <CatalogMultiSelect
                    catalog={CREDENTIALS}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Pick the credentials you hold…"
                  />
                )}
              />
              <p className="text-xs text-muted-foreground">
                Country-scoped credentials only show up to providers in that
                regulatory regime once region scoping is wired.
              </p>
            </div>

            <div className="grid gap-1.5">
              <Label>Delivery modes</Label>
              <Controller
                control={control}
                name="deliveryModeIds"
                render={({ field }) => (
                  <CatalogMultiSelect
                    catalog={DELIVERY_MODES}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Pick how you deliver care…"
                  />
                )}
              />
              {errors.deliveryModeIds && (
                <p className="text-xs text-destructive">
                  {errors.deliveryModeIds.message}
                </p>
              )}
            </div>

            <div className="rounded-lg border border-dashed p-6 text-center">
              <FileUp className="mx-auto size-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm font-medium">Upload credential proof</p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, or PNG up to 10MB
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Choose files
              </Button>
            </div>
            <div className="grid gap-2">
              {[
                "Medical License — NY State",
                "Board Certification — Family Medicine",
                "DEA Registration",
              ].map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs text-emerald-600 dark:text-emerald-400"
                    >
                      Verified
                    </Badge>
                    <span className="text-sm">{doc}</span>
                  </div>
                  <Button type="button" variant="ghost" size="icon-xs">
                    <Trash2 className="size-3.5 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Setting</CardTitle>
          <CardDescription>Set your consultation fees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Virtual visit rate</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  {...register("virtualRate")}
                  className="h-10 pl-7"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>In-person visit rate</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  {...register("inPersonRate")}
                  className="h-10 pl-7"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Visit configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Visit Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3.5">
              <div>
                <p className="text-sm font-medium">Accept new patients</p>
                <p className="text-xs text-muted-foreground">
                  Show in search results for new patients
                </p>
              </div>
              <Controller
                control={control}
                name="acceptPatients"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Default appointment duration</Label>
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Buffer time between appointments</Label>
                <Controller
                  control={control}
                  name="buffer"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No buffer</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Payment config */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Configuration</CardTitle>
          <CardDescription>How you receive your earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Bank name</Label>
              <Input {...register("bankName")} className="h-10" />
            </div>
            <div className="grid gap-1.5">
              <Label>Account number</Label>
              <Input {...register("accountNumber")} className="h-10" />
            </div>
            <div className="grid gap-1.5">
              <Label>Routing number</Label>
              <Input {...register("routingNumber")} className="h-10" />{" "}
            </div>
            <div className="grid gap-1.5">
              <Label>Payout frequency</Label>
              <Controller
                control={control}
                name="payoutFrequency"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="size-4" data-icon="inline-start" />
              Save changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

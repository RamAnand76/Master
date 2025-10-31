
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser } from '@/hooks/use-user';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { ResumeData } from '@/lib/types';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50),
  email: z.string().email("Invalid email address.").or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;

export default function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { user, updateUser, isLoaded } = useUser();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '' },
  });

  useEffect(() => {
    if (isLoaded) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [isLoaded, user, form, open]);

  const nameLastUpdatedAt = user.nameLastUpdatedAt ? new Date(user.nameLastUpdatedAt) : null;
  const isNameChangeAllowed = !nameLastUpdatedAt || (new Date().getTime() - nameLastUpdatedAt.getTime() > FIFTEEN_DAYS_IN_MS);
  
  const daysLeftForNameChange = nameLastUpdatedAt ? 15 - Math.floor((new Date().getTime() - nameLastUpdatedAt.getTime()) / (1000 * 60 * 60 * 24)) : 0;


  const onSubmit = (values: ProfileFormValues) => {
    const isNameChanged = values.name !== user.name;
    
    updateUser({
      ...values,
      nameLastUpdatedAt: isNameChanged ? new Date().toISOString() : user.nameLastUpdatedAt,
    });
    
    toast({
      title: "Profile Updated",
      description: "Your details have been saved successfully.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>
            Manage your personal information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} disabled={!isNameChangeAllowed && !!user.name} />
                  </FormControl>
                  {!isNameChangeAllowed && !!user.name && (
                    <p className="text-xs text-muted-foreground mt-1">
                      You can change your name again in {daysLeftForNameChange} day(s).
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

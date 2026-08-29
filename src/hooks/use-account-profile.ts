"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAccountAddress,
  deleteAccountAddress,
  getAccountProfile,
  requestPhoneVerification,
  updateAccountAddress,
  updateAccountProfile,
  uploadAccountPhoto,
  verifyPhoneNumber,
} from "@/services/account-profile.service";

export const accountProfileKey = ["account-profile"] as const;

export function useAccountProfile() {
  return useQuery({
    queryKey: accountProfileKey,
    queryFn: getAccountProfile,
    staleTime: 30_000,
  });
}

function useProfileMutation<T>(mutationFn: (input: T) => Promise<unknown>) {
  const client = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (profile) => client.setQueryData(accountProfileKey, profile),
  });
}

export function useUpdateAccountProfile() {
  return useProfileMutation(updateAccountProfile);
}

export function useUploadAccountPhoto() {
  return useProfileMutation(uploadAccountPhoto);
}

export function useCreateAccountAddress() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createAccountAddress,
    onSuccess: () => client.invalidateQueries({ queryKey: accountProfileKey }),
  });
}

export function useUpdateAccountAddress() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateAccountAddress,
    onSuccess: () => client.invalidateQueries({ queryKey: accountProfileKey }),
  });
}

export function useDeleteAccountAddress() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteAccountAddress,
    onSuccess: () => client.invalidateQueries({ queryKey: accountProfileKey }),
  });
}

export function useRequestPhoneVerification() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: requestPhoneVerification,
    onSuccess: () => client.invalidateQueries({ queryKey: accountProfileKey }),
  });
}

export function useVerifyPhoneNumber() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: verifyPhoneNumber,
    onSuccess: () => client.invalidateQueries({ queryKey: accountProfileKey }),
  });
}

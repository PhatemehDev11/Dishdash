"use client";

import { useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Trash2, Star, ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAddresses } from "@/features/checkout/useAddresses";

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const {
    addresses,
    loading: addressesLoading,
    deleteAddress,
    setDefault,
  } = useAddresses();

  const [name, setName] = useState(session?.user?.name ?? "");
  const [nameSaving, setNameSaving] = useState(false);
  const [nameMessage, setNameMessage] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [addressError, setAddressError] = useState("");

  async function handleNameSave(e: FormEvent) {
    e.preventDefault();
    setNameSaving(true);
    setNameMessage("");

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setNameSaving(false);

    if (res.ok) {
      await update({ name });
      setNameMessage("Saved!");
    } else {
      setNameMessage("Something went wrong.");
    }
  }

  async function handlePasswordSave(e: FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirm) {
      setPasswordError("New passwords don't match.");
      return;
    }

    setPasswordSaving(true);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }),
    });

    const data = await res.json();
    setPasswordSaving(false);

    if (!res.ok) {
      setPasswordError(data.error ?? "Something went wrong.");
      return;
    }

    setPasswordSuccess("Password updated!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirm: "" });
  }

  async function handleDeleteAddress(id: string) {
    setAddressError("");
    const error = await deleteAddress(id);
    if (error) {
      setAddressError(error);
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-[150px] pb-20 min-h-[70vh]">
        <div className="max-w-[560px] mx-auto px-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Back to profile
          </Link>

          <h1 className="text-2xl font-extrabold mb-8">Edit Profile</h1>

          <section className="mb-10">
            <h2 className="font-bold mb-4">Name</h2>
            <form onSubmit={handleNameSave} className="flex gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <Button type="submit" disabled={nameSaving}>
                {nameSaving ? "Saving..." : "Save"}
              </Button>
            </form>
            {nameMessage && (
              <p className="text-sm text-muted-foreground mt-2">
                {nameMessage}
              </p>
            )}
          </section>

          <section className="mb-10">
            <h2 className="font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSave} className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                required
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <input
                type="password"
                placeholder="New password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                required
                minLength={6}
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirm: e.target.value })
                }
                required
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              {passwordError && (
                <p className="text-destructive text-sm">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-primary text-sm">{passwordSuccess}</p>
              )}
              <Button type="submit" disabled={passwordSaving}>
                {passwordSaving ? "Saving..." : "Update Password"}
              </Button>
            </form>
          </section>

          <section>
            <h2 className="font-bold mb-4">Your Addresses</h2>

            {addressError && (
              <p className="text-destructive text-sm mb-3 bg-destructive/10 rounded-xl px-3 py-2">
                {addressError}
              </p>
            )}

            {addressesLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : addresses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No saved addresses yet — you can add one at checkout.
              </p>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="flex items-center justify-between border rounded-2xl p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                            <Star
                              className="w-3 h-3 fill-primary"
                              strokeWidth={0}
                            />{" "}
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {addr.street}, {addr.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-none">
                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => setDefault(addr.id)}
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Set default
                        </button>
                      )}
                      <button
                        type="button"
                        aria-label="Delete address"
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

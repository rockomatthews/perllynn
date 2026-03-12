"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Footer() {
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sending, setSending] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Box
      component="footer"
      id="contact"
      sx={{
        py: 6,
        px: 2,
        bgcolor: "grey.100",
        mt: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Learn how we helped 100 top brands gain success
        </Typography>
        {submitted ? (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Thank you! We&apos;ll be in touch soon.
          </Typography>
        ) : (
          <>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={sending}
              >
                {sending ? "Sending…" : "Send"}
              </Button>
            </Stack>
          </Box>
          </>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          Copyright © {new Date().getFullYear()} Perllynn | Powered by Perllynn
        </Typography>
      </Container>
    </Box>
  );
}

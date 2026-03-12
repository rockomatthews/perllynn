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
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              <Button type="submit" variant="contained" size="large">
                Send
              </Button>
            </Stack>
          </Box>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          Copyright © {new Date().getFullYear()} Perllynn | Powered by Perllynn
        </Typography>
      </Container>
    </Box>
  );
}

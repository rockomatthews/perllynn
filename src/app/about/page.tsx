import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const metadata = {
  title: "About Us | Perllynn",
  description:
    "We're Perllynn—a client-focused expert network helping small and medium-sized businesses succeed with the right strategy, technology, and people.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <Box component="main">
        {/* Page title */}
        <Box sx={{ py: 4, px: 2 }}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h3" fontWeight={600} gutterBottom>
              About Us
            </Typography>
          </Container>
        </Box>

        {/* We're Perllynn intro */}
        <Box sx={{ py: 4, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="md">
            <Typography variant="h5" fontWeight={600} gutterBottom>
              We&apos;re Perllynn, and we&apos;re here to help you succeed.
            </Typography>
            <Typography paragraph>
              We know that running a small or medium-sized business is hard work.
              You likely have a lot on your plate and not enough time to do it
              all, let alone plan for the future.
            </Typography>
            <Typography paragraph>
              That&apos;s why our team of experts exists—so that you can focus
              on what matters most: growing your business and making sure it
              thrives with the right strategy, technology, and people.
            </Typography>
            <Typography paragraph>
              We do what we do because we believe in the power of business. We
              believe that businesses can change lives, and that when businesses
              are successful, their clients, employees, and communities thrive.
            </Typography>
          </Container>
        </Box>

        {/* Who we are? */}
        <Box sx={{ py: 6, px: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Who we are?
            </Typography>
            <Typography paragraph>
              At Perllynn, our experts are independent, which means they&apos;re
              not beholden to any one client or industry. Even better, they have
              the freedom to provide unbiased advice and counsel, as they&apos;ll
              never have to worry about keeping a job or pleasing their boss.
            </Typography>
            <Typography paragraph>
              Our network is made up of diverse professionals who bring a wealth
              of experience from all over the world. Each consultant has been
              hand-selected based on their unique skill set, so you can be sure
              that you&apos;re getting the best possible advice available.
            </Typography>
          </Container>
        </Box>

        {/* What do we do? */}
        <Box sx={{ py: 4, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              What do we do?
            </Typography>
            <Typography paragraph>
              Perllynn is a client-focused company that takes pride in
              delivering high-quality work and exceptional client support. We
              connect businesses with experts to create integrated, inclusive
              plans and strategies that help them expand while also assisting
              their clients, employees, and community to succeed.
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Typography>
                Our mission is simple: To have an accessible expert network that
                provides clients with the critical information required to
                operate a business.
              </Typography>
              <Typography>
                We believe that every small or medium-sized business deserves
                the same level of support as the big guys do, and that&apos;s
                why we work hard to ensure every client feels they are our top
                priority. We take pride in delivering high-quality work and
                exceptional client support, because we know that when you enjoy
                a big win, we do too.
              </Typography>
              <Typography>
                It might seem simple, but connecting our clients with the right
                expert can make all the difference in helping them achieve their
                goals. We recognize that every business is unique, and we work
                hard to ensure that every client gets the right expert for their
                needs.
              </Typography>
              <Typography>
                In turn, we also strive to help the best independent
                professionals in the industry land consulting opportunities with
                small and medium-sized businesses—ones that they might not have
                been able to access otherwise.
              </Typography>
            </Stack>
          </Container>
        </Box>

        {/* Why we do it? */}
        <Box sx={{ py: 6, px: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Why we do it?
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom sx={{ mt: 2 }}>
              Because we love solving problems
            </Typography>
            <Typography paragraph>
              It&apos;s not about the money for us—it&apos;s about seeing our
              clients succeed because of the guidance we&apos;ve helped them to
              access.
            </Typography>
            <Typography paragraph>
              This mission doesn&apos;t stop short at watching business owners
              create a better future for themselves, either. We also want to see
              how your work helps your clients succeed in the process.
            </Typography>
            <Typography paragraph>
              That&apos;s why we&apos;re so passionate about what we do: we want
              everyone involved in a business venture to feel like they&apos;re
              part of something bigger than themselves; something that will help
              them reach their maximum potential as both experts in their field
              and as human beings.
            </Typography>
            <Stack direction="row" sx={{ mt: 3 }}>
              <Button
                component="a"
                href="/#contact"
                variant="contained"
                size="large"
              >
                Connect With An Expert
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Partner Perks */}
        <Box sx={{ py: 4, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Partner Perks
            </Typography>
            <Typography paragraph>
              Discover the countless advantages of partnering with Perllynn! When
              you choose to work with our team of top industry experts, you gain
              access to invaluable knowledge and experience. We provide tailored
              strategies for sustainable and continuous growth, helping your
              business thrive even in the most competitive landscapes. Embracing
              cutting-edge technologies is an essential part of our approach,
              allowing you to stay at the forefront of advancements and drive
              innovation within your industry. With us by your side, you&apos;ll
              receive guidance, support, and solutions that empower your
              business to reach new heights. Experience the benefits of working
              with the best – connect with us today and unlock your
              business&apos;s full potential!
            </Typography>
            <Button component="a" href="/#contact" variant="contained" size="large">
              Connect with us today
            </Button>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
}

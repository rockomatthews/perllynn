import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const services = [
  {
    title: "Business Systems Consulting and Implementations",
    description:
      "Discover and implement the right systems and tools to streamline your internal operations and support the growth of your company.",
  },
  {
    title: "Product and Process Analysis/Costing",
    description:
      "Receive a clear picture of your products and identify opportunities for improvement in terms of cost, quality, delivery, and customer satisfaction.",
  },
  {
    title: "Financial and Accounting Management",
    description:
      "Streamline and optimize your business finances to reduce costs and improve cash flow.",
  },
  {
    title: "Budgeting and Forecasting",
    description:
      "Develop a clear financial roadmap to help you anticipate and plan for future growth.",
  },
  {
    title: "Insurance and Risk Management Analysis",
    description:
      "Identify the risks associated with your business and implement systems to mitigate each threat.",
  },
  {
    title: "Merger, Acquisition, and Joint Venture Planning",
    description:
      "Prepare and implement a strategy for when your business is ready to expand into new markets or acquire other companies.",
  },
  {
    title: "Business Strategy and Operations",
    description:
      "Build a framework for how your business will compete in the marketplace and how it will evolve over time.",
  },
];

const whyWorkWithUs = [
  "High quality work and unparalleled support",
  "Guidance designed to create impact and drive profits for your business",
  "Innovative and timeless approaches that support small and medium-sized businesses",
  "Flexible and transparent financing options with a strategic adaptability process",
  "Results that will help you increase accessibility, efficiency, effectiveness, and competitiveness through digital transformation",
];

export default function Home() {
  return (
    <>
      <Header />
      <Box component="main">
        {/* Hero */}
        <Box id="hero" sx={{ py: { xs: 6, md: 10 }, px: 2 }}>
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              gutterBottom
              fontWeight={600}
            >
              Accessible business strategy and financial management consulting,
              driving tangible results
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary">
              On-Demand Knowledge
            </Typography>
          </Container>
        </Box>

        {/* On-Demand Knowledge */}
        <Box sx={{ py: 6, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="lg">
            <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
              On-Demand Knowledge
            </Typography>
            <Typography paragraph sx={{ mb: 4 }}>
              Modern businesses need access to the right information, at the
              right time, and in the right format. Our ecosystem of experts
              delivers just that—providing you with insights and actionable
              advice to achieve the results you seek.
            </Typography>
            <Typography paragraph sx={{ mb: 4 }}>
              Perllynn connects clients with top-tier independent subject matter
              experts in a variety of industries, who can offer guidance and
              support on business operations and advise on business processes
              and strategies in the following areas:
            </Typography>
            <Grid container spacing={3}>
              {services.map((service) => (
                <Grid size={{ xs: 12, md: 6 }} key={service.title}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Tagline block */}
        <Box sx={{ py: 6, px: 2 }}>
          <Container maxWidth="md">
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              fontWeight={600}
            >
              We are experts in orchestrating the transformation of business
              ecosystems, resulting in lasting success.
            </Typography>
            <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
              Perllynn provides professional services, carefully designed to give
              your business a competitive advantage that&apos;s both sustainable
              and dynamic. Our expert network empowers organizations to navigate
              market complexities, emerging stronger and more successful on the
              other side.
            </Typography>
            <Stack alignItems="center">
              <Button
                component="a"
                href="/services"
                variant="contained"
                size="large"
              >
                Learn about our services
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Services */}
        <Box id="services" sx={{ py: 6, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
              Services
            </Typography>
            <Grid container spacing={2}>
              {services.map((service) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.title}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {service.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Why Work With Us */}
        <Box id="about" sx={{ py: 6, px: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h4" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
              Why Work With Us?
            </Typography>
            <Typography paragraph color="text.secondary">
              Perllynn&apos;s top-tier independent experts have extensive
              industry knowledge and deliver the best results, regardless of the
              challenge. When you partner with us, you&apos;re guaranteed to
              receive:
            </Typography>
            <Stack component="ul" spacing={1} sx={{ pl: 2.5 }}>
              {whyWorkWithUs.map((item) => (
                <Typography
                  component="li"
                  key={item}
                  variant="body1"
                  color="text.secondary"
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* CTA block */}
        <Box sx={{ py: 6, px: 2, bgcolor: "primary.main", color: "primary.contrastText" }}>
          <Container maxWidth="md">
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              fontWeight={600}
            >
              Don&apos;t let the fear of change stand in the way of innovation.
            </Typography>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ opacity: 0.95 }}
            >
              Let Perllynn help your business stay ahead of the curve!
            </Typography>
            <Stack alignItems="center" sx={{ mt: 3 }}>
              <Button
                component="a"
                href="#contact"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "background.paper",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                Talk with an expert today
              </Button>
            </Stack>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
}

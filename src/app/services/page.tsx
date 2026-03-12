import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

export const metadata = {
  title: "Services | Perllynn",
  description:
    "Business strategy and operations consulting. Our experts help you develop a clear vision, assess your current state, and implement lasting transformation.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <Box component="main">
        {/* Page title */}
        <Box sx={{ py: 4, px: 2 }}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h3" fontWeight={600} gutterBottom>
              Services
            </Typography>
          </Container>
        </Box>

        {/* What is Business Strategy and Operations? */}
        <Box sx={{ py: 4, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              What is Business Strategy and Operations?
            </Typography>
            <Typography paragraph>
              Business strategy and operations are the foundation of your
              business. They help you define what you do, how you do it, and why
              it&apos;s important to your customers. If you&apos;re not clear on
              these things, it can be hard to get new customers, grow your
              business, or make sure that the people who work for you are working
              effectively.
            </Typography>
            <Typography paragraph>
              It may sound like business strategy and operations are only for
              big companies, but they&apos;re not. Even if you&apos;re just
              starting out or have a small business, it&apos;s important to know
              what your company does and why it matters.
            </Typography>
            <Typography paragraph>
              Don&apos;t worry: We&apos;re here to help. Perllynn&apos;s experts
              can help you figure out the answers to these questions and then
              create a game plan that will guide your business for years to come.
            </Typography>
            <Stack direction="row" sx={{ mt: 3 }}>
              <Button component="a" href="/#contact" variant="contained" size="large">
                Talk with us
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Our Approach */}
        <Box sx={{ py: 6, px: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Our Approach
            </Typography>
            <Typography paragraph>
              Our experts can help you develop a clear vision for your
              company&apos;s future and make sure that everyone involved in
              running your business understands where they fit into it.
              They&apos;ll also help you develop strategies for achieving those
              goals—so that every day at work feels like an opportunity to move
              closer toward them.
            </Typography>
          </Container>
        </Box>

        {/* Assessing Your Current State */}
        <Box sx={{ py: 4, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Assessing Your Current State
            </Typography>
            <Typography paragraph>
              The first step in creating a strong business strategy is to figure
              out where you are right now. To do this, our experts will work
              closely with you to assess all aspects of your company&apos;s
              operations, from financials and marketing to human resources and
              management systems.
            </Typography>
            <Typography paragraph>
              They&apos;ll also review the objectives you&apos;re aiming for and
              make sure that your business is positioned to meet them—and if
              not, they&apos;ll note them for later.
            </Typography>
            <Typography paragraph>
              Once they&apos;ve assessed these areas for a clearer picture of
              your existing business, they can finally start forming and
              providing actionable recommendations.
            </Typography>
          </Container>
        </Box>

        {/* Guidance From Every Angle */}
        <Box sx={{ py: 6, px: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Guidance From Every Angle
            </Typography>
            <Typography paragraph>
              Our partnership is designed to help you succeed by tackling the
              problems you face using practical and comprehensive methods.
              We&apos;ll help you implement a lasting transformation by working
              with your people to ensure they&apos;re fully engaged and prepared
              to help you succeed in the long run.
            </Typography>
            <Typography paragraph>
              Not only that… but our top-tier experts have the knowledge
              necessary to overcome even the steepest of operational roadblocks
              keeping you from achieving your goals. They&apos;ll combine a
              range of data, benchmarks, algorithms, and other holistic insights
              to solve problems and craft operating models that can be applied
              across your organization. Their scalability and flexibility also
              ensures they can be used to identify opportunities and visualize
              the future of your company at any point in time—not just the
              present.
            </Typography>
          </Container>
        </Box>

        {/* Technology that Empowers */}
        <Box sx={{ py: 4, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Technology that Empowers
            </Typography>
            <Typography paragraph>
              Your digital transformation begins with the right tools. Our team
              of experts will help you identify and implement the most effective
              technologies to support your business efforts and enjoy all the
              benefits associated with digitization.
            </Typography>
            <Typography paragraph>
              They&apos;ll also work with you to determine which platforms are
              best suited for each part of your operation, ensuring that no stone
              is left unturned when it comes to improving efficiency and
              productivity.
            </Typography>
          </Container>
        </Box>

        {/* Give your customers the edge */}
        <Box sx={{ py: 6, px: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Give your customers the edge
            </Typography>
            <Typography paragraph>
              Whether you employ only one or several of these strategies, the
              goal is to create a dynamic framework for your business that
              helps it to:
            </Typography>
            <Stack component="ul" spacing={1} sx={{ pl: 2.5, mb: 3 }}>
              <Typography component="li">
                Stay competitive by evolving.
              </Typography>
              <Typography component="li">
                Promote your unique value proposition.
              </Typography>
              <Typography component="li">
                Build and cultivate key talent.
              </Typography>
            </Stack>
            <Typography paragraph>
              Schedule a free time to talk to see if we could work effectively
              together!
            </Typography>
            <Button component="a" href="/#contact" variant="contained" size="large">
              Contact us
            </Button>
          </Container>
        </Box>

        {/* Our Impact */}
        <Box sx={{ py: 4, px: 2, bgcolor: "grey.50" }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Our Impact
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600}>Cost-driven strategy</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600}>
                  Product or service development strategy
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600}>
                  Customer-driven operational strategy
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600}>Flexibility strategy</Typography>
              </Paper>
            </Stack>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
}

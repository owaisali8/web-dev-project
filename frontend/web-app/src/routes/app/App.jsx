import { Typography, Box, Stack, Card, CardMedia, CardContent, Button } from '@mui/material'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import { TypeAnimation } from 'react-type-animation';
import './App.css'

function App() {

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ m: 15 }} />
      <div>
      <TypeAnimation
      sequence={[
        'Kaam Daam', 
        4000, 
        'کام دام',
        4000
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      speed={30}
      style={{ fontSize: '7em', display: 'inline-flex', color: "white" }}
    /> 
    <br/>
        {/* <Typography variant='h1' color="white">Kaam Daam</Typography> */}
        <Typography variant='h7' color="white">
          App that connects service providers with customers in need.
        </Typography>
      </div>
      <Box sx={{ m: 5 }} />
      <div>
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
          <Card sx={{ minWidth: 200, minHeight: 200, }} >
            <CardMedia
              sx={{ height: 140 }}
              image="https://source.unsplash.com/V5vqWC9gyEU/"
              title="connect"
            />
            <CardContent>
              <center><Typography varient='h4' >Connect</Typography></center>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200, minHeight: 200 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://source.unsplash.com/afW1hht0NSs/"
              title="connect"
            />
            <CardContent>
              <center><Typography varient='h4' >Find</Typography></center>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200, minHeight: 200 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://source.unsplash.com/9wY2ofzQ9Us/"
              title="connect"
            />
            <CardContent>
              <center><Typography varient='h4' >Pay</Typography></center>
            </CardContent>
          </Card>
        </Stack>
      </div>
      <div>
        <Box sx={{ m: 14 }} />
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" align="left">
                Do you need help?
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Hiring a maid for home chores or a gardener to look after a garden is a daunting task especially for females in Pakistan as people seem to have trust issues due to authenticity and security concerns.
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Keeping that in mind, we have come up with an idea of an app that provides a safe and trusted platform for the people who want to hire for home chores or to be registered on the platform as those who provide domestic services on an individual level. Since authenticity is our first priority that is what makes our platform safe as all the registrations are varied first before they go online on our platform.
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                The model of this app is similar to freelancing sites where employers post jobs and the potential employees submit their proposal and rate for the jobs. Major services for which people can register or hire include housecleaning, cooking, nanny, gardening, and personal service etc.
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 600, backgroundPosition: 'center' }}
            image="https://source.unsplash.com/__ZMnefoI3k"
            alt="Image of spray bottle"
          />
        </Card>
      </div>
      <div>
        <Box sx={{ m: 5 }} />
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 600, backgroundPosition: 'center' }}
            image="https://source.unsplash.com/vuDXJ60mJOA"
            alt="Image of spray bottle"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" align="left">
                Features
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Employers/employees can create their profile on the platform by providing required details.
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Employer/Client is able to post their job with all the required details.
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Employee/Worker is able to apply to jobs from different clients based on their services they are registered to provide.
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Employers are able to access the employee&apos;s profile and his profile rating if available.
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Only Employer can initiate communication to protect Employer&apos;s privacy.

              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Service providers&apos; profiles are online only when Kaam Daam&apos;s admin verifies it.
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Employers can give ratings to the workers after the job completion.
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
                Users can make account deletion requests to delete his/her account.
              </Typography>
              <Box sx={{ m: 2 }} />
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            </Box>
          </Box>

        </Card>
      </div>
      <div>
        <Box sx={{ m: 5 }} />
        <Card sx={{ minWidth: 200, minHeight: 200 }}>
          <Box sx={{ m: 2 }} />
          <CardContent>
            <Typography component="div" variant="h4" align="center">
              What are you waiting for?
            </Typography>
            <Box sx={{ m: 5 }} />
            <Button variant="contained" size="large" sx={{ bgcolor: "black" }}>Download The App Now</Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default App

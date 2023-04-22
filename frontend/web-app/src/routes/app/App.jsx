import { Typography, Box, Stack, Card } from '@mui/material'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import './App.css'

function App() {

  return (
    <>
      <ResponsiveAppBar />
      <div>
        <Typography variant='h1'>Kaam Daam</Typography>
        <Typography variant='subtitle1'>App that connects service providers with customers in need.</Typography>
      </div>
      <Box sx={{ m: 5 }} />
      <div>
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
          <Card sx={{ minWidth: 150, minHeight: 120}}>
          <Box sx={{ m: 6 }} />
            <center><Typography varient='h4' >Connect</Typography></center>
          </Card>
          <Card sx={{ minWidth: 150, minHeight: 120}}>
          <Box sx={{ m: 6 }} />
            <center><Typography varient='h4' >Find</Typography></center>
          </Card>
          <Card sx={{ minWidth: 150, minHeight: 120}}>
          <Box sx={{ m: 6 }} />
            <center><Typography varient='h4' >Pay</Typography></center>
          </Card>
        </Stack>
      </div>
    </>
  )
}

export default App

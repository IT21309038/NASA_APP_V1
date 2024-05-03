import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPlayer from "react-player";
import apiDefinitions from "../api/apiDefinitions";

const HistoricalData = () => {
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [pictureData, setPictureData] = useState(null);

  const [is1080p, setIs1080p] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIs1080p(window.innerWidth >= 1500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let containerStyle = {};

  if (is1080p) {
    containerStyle = {
      paddingLeft: "5%", // Adjust the left padding as needed
    };
  } else {
    containerStyle = {
      paddingLeft: "25%", // Adjust the left padding as needed
    };
  }

  const handleImageSearch = () => {
    if (!date) {
      setDateError("Please select a date");
      return;
    }

    // Call the API to get the picture data
    apiDefinitions
      .getPictureByDate(date)
      .then((response) => {
        if (response.status === 200) {
          setPictureData(response.data);
          console.log(response.data);
        } else {
          console.log("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, textAlign: "center" }}
          >
            Missed a Daily Image of Earth
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontStyle: "italic", textAlign: "center" }}
          >
            Don't worry, we have you covered
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic", py: 5 }}>
            Select a date to view the image of the day and explore
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="Field Label"
            required
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setDateError("");
            }}
            error={!!dateError}
            helperText={dateError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ fontSize: "20px" }}>
                  {/* <Icon icon="uiw:date" /> */}
                </InputAdornment>
              ),
            }}
            inputProps={{ max: new Date().toISOString().split("T")[0] }}
          />
        </Grid>

        <Grid item xs={6} sx={{ my: 1.2 }}>
          <Button
            variant="contained"
            sx={{ px: 4 }}
            onClick={handleImageSearch}
          >
            Search Image
          </Button>
        </Grid>

        {pictureData && (
          <>
            <Grid item xs={12} sx={{ my: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {pictureData.title}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pictureData.media_type === "image" ? (
                <LazyLoadImage
                src={pictureData.url}
                alt={pictureData.title}
                width={'100%'}
                height={is1080p ? 700 : 400}
                effect="blur"
              />
              ) : (
                pictureData.media_type === "video" && (
                  <Box sx={containerStyle}>
                    <ReactPlayer
                      url={pictureData.url}
                      controls={true}
                      width={is1080p ? "1200px" : "100%"}
                      height={is1080p ? "500px" : "auto"}
                    />
                  </Box>
                )
              )}
            </Grid>

            <Grid item xs={12} sx={{ my: 2 }}>
              <Typography
                variant="body1"
                sx={{ display: "flex", justifyContent: "right" }}
              >
                Copyright: {pictureData.copyright || "Not Available"}
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ my: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "justify",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                {pictureData.explanation}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default HistoricalData;

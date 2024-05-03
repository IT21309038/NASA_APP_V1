import { useState, useEffect } from "react";
import apiDefinitions from "../api/apiDefinitions";
import { Box, Grid, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
  const [pictureData, setPictureData] = useState([]);

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

  useEffect(() => {
    apiDefinitions
      .getPictureOfTheDay()
      .then((response) => {
        if (response.status === 200) {
          setPictureData(response.data);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      // sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Explore the Picture/Video of the Day
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            {pictureData.date}
          </Typography>
        </Box>
      </Grid>

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
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
          sx={{ textAlign: "justify", fontWeight: 400, fontStyle: "italic" }}
        >
          {pictureData.explanation}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;

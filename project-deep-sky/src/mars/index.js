import {
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import apiDefinitions from "../api/apiDefinitions";
import { Icon } from "@iconify/react";

const MarsExplore = () => {
  const [marsData, setMarsData] = useState(null);

  const [sol, setSol] = useState("");
  const [solError, setSolError] = useState(false);

  const [rover, setRover] = useState("");
  const [roverError, setRoverError] = useState(false);

  const [camera, setCamera] = useState("");
  const [cameraError, setCameraError] = useState(false);

  const [showCameraDropdown, setShowCameraDropdown] = useState(false);

  const handleSelectRover = (e) => {
    const selectedRover = e.target.value;
    setRover(selectedRover);
    setRoverError("");
    // Determine whether to show camera dropdown based on selected rover
    setShowCameraDropdown(selectedRover !== "");
  };

  const handleCameraChange = (event) => {
    const selectedCamera = event.target.value;
    setCamera(selectedCamera);
    // You can add your validation logic here
    // For simplicity, let's assume it's valid for now
    setCameraError("");
  };

  useEffect(() => {
    setCamera("");
  }, [rover]);

  const handleFilerApply = () => {
    if (sol.trim() === "") {
      setSolError("Please enter a valid sol value");
    }
    if (rover.trim() === "") {
      setRoverError("Please select a rover type");
    }
    if (camera.trim() === "") {
      setCameraError("Please select a camera type");
    }
    if (sol.trim() === "" || rover.trim() === "" || camera.trim() === "") {
      setCameraError("Please select a camera type");
      setRoverError("Please select a rover type");
      setSolError("Please enter a valid sol value");
    }

    apiDefinitions
      .getMarsPictures(sol, camera, rover)
      .then((response) => {
        if (response.status === 200) {
          setMarsData(response.data);
        } else {
          console.log("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600 }}>
          Explore the Unseen Mars
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ my: 2 }}>
        <Typography
          variant="body1"
          sx={{ textAlign: "left", fontWeight: 500, fontStyle: "italic" }}
        >
          Add Filters to Explore Mars
        </Typography>
      </Grid>

      <Grid container spacing={2} sx={{ py: 2 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Set Sol Value"
            type="number"
            onChange={(e) => {
              setSol(e.target.value);
              setSolError("");
            }}
            error={!!solError}
            helperText={solError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ fontSize: "20px" }}>
                  <Icon icon="fluent:number-symbol-32-filled" />
                </InputAdornment>
              ),
              inputProps: { min: 0, max: 1000 },
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth error={!!roverError}>
            <InputLabel>Rover Type</InputLabel>
            <Select
              value={rover}
              label="Rover Type"
              onChange={(e) => {
                handleSelectRover(e);
                setCameraError("");
              }}
            >
              <MenuItem value="curiosity">Curiosity</MenuItem>
              <MenuItem value="opportunity">Opportunity</MenuItem>
              <MenuItem value="spirit">Spirit</MenuItem>
            </Select>
            {!!roverError && <FormHelperText>{roverError}</FormHelperText>}
          </FormControl>
        </Grid>

        {showCameraDropdown && (
          <Grid item xs={4}>
            {rover === "curiosity" ? (
              <FormControl fullWidth error={!!cameraError}>
                <InputLabel>Camera Type</InputLabel>
                <Select
                  value={camera}
                  label="Camera Type"
                  onChange={handleCameraChange}
                >
                  <MenuItem value="FHAZ">
                    Front Hazard Avoidance Camera
                  </MenuItem>
                  <MenuItem value="RHAZ">
                    Rear Hazard Avoidance Camera{" "}
                  </MenuItem>
                  <MenuItem value="MAST">Mast Camera</MenuItem>
                  <MenuItem value="CHEMCAM">
                    Chemistry and Camera Complex
                  </MenuItem>
                  <MenuItem value="MAHLI">Mars Hand Lens Imager</MenuItem>
                  <MenuItem value="MARDI">Mars Descent Imager </MenuItem>
                  <MenuItem value="NAVCAM">Navigation Camera</MenuItem>
                </Select>
                {!!cameraError && (
                  <FormHelperText>{cameraError}</FormHelperText>
                )}
              </FormControl>
            ) : (
              <FormControl fullWidth error={!!cameraError}>
                <InputLabel>Camera Type</InputLabel>
                <Select
                  value={camera}
                  label="Camera Type"
                  onChange={handleCameraChange}
                >
                  <MenuItem value="FHAZ">
                    Front Hazard Avoidance Camera
                  </MenuItem>
                  <MenuItem value="RHAZ">
                    Rear Hazard Avoidance Camera{" "}
                  </MenuItem>
                  <MenuItem value="NAVCAM">Navigation Camera</MenuItem>
                  <MenuItem value="PANCAM">Panoramic Camera </MenuItem>
                  <MenuItem value="MINITES">
                    Miniature Thermal Emission Spectrometer (Mini-TES)
                  </MenuItem>
                </Select>
                {!!cameraError && (
                  <FormHelperText>{cameraError}</FormHelperText>
                )}
              </FormControl>
            )}
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Icon icon="oui:search" />}
            onClick={handleFilerApply}
          >
            Explore Mars
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {marsData && marsData.photos && marsData.photos.length > 0 ? (
          <ImageList variant="masonry" cols={4} gap={8}>
            {marsData.photos.map((photo) => (
              <ImageListItem key={photo.id}>
                <img
                  srcSet={`${photo.img_src.replace(
                    /^http:\/\//i,
                    "https://"
                  )}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${photo.img_src.replace(
                    /^http:\/\//i,
                    "https://"
                  )}?w=248&fit=crop&auto=format`}
                  alt={photo.id}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No possible results found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default MarsExplore;

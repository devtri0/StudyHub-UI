import axios from "axios";

export const handleImageUpload = async (
  e, 
  setIsUploading, 
  setFormData, 
  setPreviewImage,
  toast
) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("photo", file);
  setIsUploading(true);

  try {
    const response = await axios.patch(
      "https://studyhub-api-p0q4.onrender.com/update/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setFormData(prev => ({ ...prev, photo: response.data.url }));
    setPreviewImage(URL.createObjectURL(file));
    toast.success("Photo uploaded successfully!");
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Failed to upload photo");
  } finally {
    setIsUploading(false);
  }
};

export const handleArrayFieldChange = (e, setter) => {
  setter(e.target.value);
};

export const handleAddToArray = (field, value, setter, setFormData) => {
  if (value.trim()) {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value.trim()]
    }));
    setter("");
  }
};

export const handleRemoveFromArray = (field, index, setFormData) => {
  setFormData(prev => ({
    ...prev,
    [field]: prev[field].filter((_, i) => i !== index)
  }));
};
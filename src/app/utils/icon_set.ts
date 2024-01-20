import {
  faFilePdf,
  faFileExcel,
  IconDefinition,
  faFileAudio,
  faFileImage,
  faFileVideo,
  faFileWord,
  faFilePowerpoint,
  faFileText,
  faFileCode,
  faFileArchive,
} from "@fortawesome/free-solid-svg-icons";
export const MimeToIconDefinitionMap: Record<string, IconDefinition> = {
  // Media
  image: faFileImage,
  audio: faFileAudio,
  video: faFileVideo,
  // Documents
  "application/pdf": faFilePdf,
  "application/msword": faFileWord,
  "application/vnd.ms-word": faFileWord,
  "application/vnd.oasis.opendocument.text": faFileWord,
  "application/vnd.openxmlformats-officedocument.wordprocessingml": faFileWord,
  "application/vnd.ms-excel": faFileExcel,
  "application/vnd.openxmlformats-officedocument.spreadsheetml": faFileExcel,
  "application/vnd.oasis.opendocument.spreadsheet": faFileExcel,
  "application/vnd.ms-powerpoint": faFilePowerpoint,
  "application/vnd.openxmlformats-officedocument.presentationml":
    faFilePowerpoint,
  "application/vnd.oasis.opendocument.presentation": faFilePowerpoint,
  "text/plain": faFileText,
  "text/html": faFileCode,
  "application/json": faFileCode,
  // Archives
  "application/gzip": faFileArchive,
  "application/zip": faFileArchive,
};

export const fileTypeConversion = (type: string) => {
  if (type?.startsWith("image")) return "image";
  if (type?.startsWith("audio")) return "audio";
  if (type?.startsWith("video")) return "video";
  return type;
};

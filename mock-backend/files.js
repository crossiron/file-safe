const path = require('node:path');

const data = [
  {
    id: 'f1a2b3c4d5',
    filename: 'document1.pdf',
    extension: 'pdf',
    size: 1248,
    created: new Date('2023-06-12T10:21:00'),
    updated: new Date('2023-06-15T14:30:00'),
    accessed: new Date('2023-09-20T08:40:00'),
    mimetype: 'application/pdf'
  },
  {
    id: 'a2b3c4d5e6',
    filename: 'photo.jpg',
    extension: 'jpg',
    size: 5429,
    created: new Date('2024-01-08T16:12:00'),
    updated: new Date('2024-03-22T09:50:00'),
    accessed: new Date('2024-05-15T12:34:00'),
    mimetype: 'image/jpeg'
  },
  {
    id: 'b3c4d5e6f7',
    filename: 'presentation.pptx',
    extension: 'pptx',
    size: 10432,
    created: new Date('2023-11-18T13:45:00'),
    updated: new Date('2024-01-10T16:00:00'),
    accessed: new Date('2024-02-20T10:15:00'),
    mimetype: 'application/vnd.ms-powerpoint'
  },
  {
    id: 'c4d5e6f7g8',
    filename: 'spreadsheet.xlsx',
    extension: 'xlsx',
    size: 7865,
    created: new Date('2022-08-01T09:00:00'),
    updated: new Date('2023-01-05T11:20:00'),
    accessed: new Date('2023-05-13T14:25:00'),
    mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  },
  {
    id: 'd5e6f7g8h9',
    filename: 'video.mp4',
    extension: 'mp4',
    size: 1048576,
    created: new Date('2023-03-14T07:30:00'),
    updated: new Date('2023-06-10T18:00:00'),
    accessed: new Date('2023-07-20T16:30:00'),
    mimetype: 'video/mp4'
  },
  {
    id: 'e6f7g8h9i0',
    filename: 'audio.mp3',
    extension: 'mp3',
    size: 5120,
    created: new Date('2024-04-20T15:15:00'),
    updated: new Date('2024-05-25T14:10:00'),
    accessed: new Date('2024-06-01T10:30:00'),
    mimetype: 'audio/mpeg'
  },
  {
    id: 'f7g8h9i0j1',
    filename: 'archive.zip',
    extension: 'zip',
    size: 20480,
    created: new Date('2023-07-12T08:20:00'),
    updated: new Date('2023-09-15T18:45:00'),
    accessed: new Date('2023-10-21T20:15:00'),
    mimetype: 'application/zip'
  },
  {
    id: 'g8h9i0j1k2',
    filename: 'code.js',
    extension: 'js',
    size: 210,
    created: new Date('2024-08-02T06:45:00'),
    updated: new Date('2024-08-20T11:22:00'),
    accessed: new Date('2024-10-10T09:00:00'),
    mimetype: 'application/javascript'
  },
  {
    id: 'h9i0j1k2l3',
    filename: 'report.docx',
    extension: 'docx',
    size: 3042,
    created: new Date('2022-05-25T10:35:00'),
    updated: new Date('2022-06-20T16:00:00'),
    accessed: new Date('2023-02-28T14:00:00'),
    mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  {
    id: 'i0j1k2l3m4',
    filename: 'notes.txt',
    extension: 'txt',
    size: 512,
    created: new Date('2023-09-30T12:00:00'),
    updated: new Date('2023-10-10T15:30:00'),
    accessed: new Date('2023-10-12T17:45:00'),
    mimetype: 'text/plain'
  }
];

const files = () => ({
  files: data.sort((a, b) => b.created - a.created),
});
const uploadFile = (file) => {
  data.push({
    id: Math.random().toString(36).slice(2),
    filename: file.originalname,
    extension: path.extname(file.originalname).slice(1),
    size: file.size,
    created: new Date(),
    updated: new Date(),
    accessed: new Date(),
    mimetype: file.mimetype
  });
  return {
    file: data[data.length - 1]
  }
}

exports.files = files;
exports.uploadFile = uploadFile;

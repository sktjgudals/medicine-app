export interface ClassRoomProps {
  id: string;
  name: string;
  descriptionHeading: string;
  ownerId: string;
  creationTime: string;
  updateTime: string;
  enrollmentCode: string;
  courseState: string;
  alternateLink: string;
  teacherGroupEmail: string;
  courseGroupEmail: string;
  teacherFolder: [Object];
  guardiansEnabled: boolean;
  calendarId: string;
  gradebookSettings: [Object];
  section: string;
}

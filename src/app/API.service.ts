/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type ConfirmAppointmentMutation = {
  __typename: "Response";
  code: string;
};

export type CompleteAppointmentMutation = {
  __typename: "Response";
  code: string;
};

export type SetDoctorLocationMutation = {
  __typename: "Response";
  code: string;
};

export type SetHospitalLocationMutation = {
  __typename: "Response";
  code: string;
};

export type AppointmentsChangedMutation = {
  __typename: "Appointment";
  appointment_type: string;
  doctor_id: string;
  hospital_id: string | null;
  message: string | null;
  preferred_timestamp: number | null;
  user_id: string | null;
  type: string | null;
  appointment_status: string;
  booking_timestamp: number;
  _id: string;
  confirm_timestamp: number | null;
  complete_timestamp: number | null;
  user_name: string | null;
  age: number | null;
  phone: string | null;
};

export type CancelAppointmentMutation = {
  __typename: "Response";
  code: string;
};

export type UpdateDoctorMutation = {
  __typename: "Response";
  code: string;
};

export type BookAppointmentMutation = {
  __typename: "Response";
  code: string;
};

export type AddDoctorMutation = {
  __typename: "Response";
  code: string;
};

export type RemoveDoctorLocationMutation = {
  __typename: "Response";
  code: string;
};

export type GetAppointmentsByDoctorQuery = {
  __typename: "Appointment";
  appointment_type: string;
  doctor_id: string;
  hospital_id: string | null;
  message: string | null;
  preferred_timestamp: number | null;
  user_id: string | null;
  type: string | null;
  appointment_status: string;
  booking_timestamp: number;
  _id: string;
  confirm_timestamp: number | null;
  complete_timestamp: number | null;
  user_name: string | null;
  age: number | null;
  phone: string | null;
};

export type GetDoctorByIdQuery = {
  __typename: "Doctor";
  rating: number | null;
  charge: number | null;
  _id: string;
  rating_count: number | null;
  is_active: boolean | null;
  speciality: string | null;
  email_verified: boolean | null;
  name: string | null;
  phone_number_verified: boolean | null;
  phone_number: string | null;
  email: string | null;
  views: number | null;
  image: string | null;
  location: Array<number | null> | null;
  schedule: {
    __typename: "Schedule";
    sun: Array<number | null> | null;
    mon: Array<number | null> | null;
    tue: Array<number | null> | null;
    wed: Array<number | null> | null;
    thu: Array<number | null> | null;
    fri: Array<number | null> | null;
    sat: Array<number | null> | null;
  } | null;
};

export type GetSpecialitiesQuery = {
  __typename: "Speciality";
  image: string | null;
  title: string;
};

export type AppointmentsChangedSubSubscription = {
  __typename: "Appointment";
  appointment_type: string;
  doctor_id: string;
  hospital_id: string | null;
  message: string | null;
  preferred_timestamp: number | null;
  user_id: string | null;
  type: string | null;
  appointment_status: string;
  booking_timestamp: number;
  _id: string;
  confirm_timestamp: number | null;
  complete_timestamp: number | null;
  user_name: string | null;
  age: number | null;
  phone: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async ConfirmAppointment(
    appointment_id: string
  ): Promise<ConfirmAppointmentMutation> {
    const statement = `mutation ConfirmAppointment($appointment_id: String!) {
        confirmAppointment(appointment_id: $appointment_id) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      appointment_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ConfirmAppointmentMutation>response.data.confirmAppointment;
  }
  async CompleteAppointment(
    appointment_id: string
  ): Promise<CompleteAppointmentMutation> {
    const statement = `mutation CompleteAppointment($appointment_id: String!) {
        completeAppointment(appointment_id: $appointment_id) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      appointment_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CompleteAppointmentMutation>response.data.completeAppointment;
  }
  async SetDoctorLocation(
    doctor_id: string,
    latitude: number,
    longitude: number
  ): Promise<SetDoctorLocationMutation> {
    const statement = `mutation SetDoctorLocation($doctor_id: String!, $latitude: Float!, $longitude: Float!) {
        setDoctorLocation(doctor_id: $doctor_id, latitude: $latitude, longitude: $longitude) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      doctor_id,
      latitude,
      longitude
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SetDoctorLocationMutation>response.data.setDoctorLocation;
  }
  async SetHospitalLocation(
    hospital_id: string,
    latitude: number,
    longitude: number
  ): Promise<SetHospitalLocationMutation> {
    const statement = `mutation SetHospitalLocation($hospital_id: String!, $latitude: Float!, $longitude: Float!) {
        setHospitalLocation(hospital_id: $hospital_id, latitude: $latitude, longitude: $longitude) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      hospital_id,
      latitude,
      longitude
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SetHospitalLocationMutation>response.data.setHospitalLocation;
  }
  async AppointmentsChanged(
    appointment_id: string
  ): Promise<AppointmentsChangedMutation> {
    const statement = `mutation AppointmentsChanged($appointment_id: String!) {
        appointmentsChanged(appointment_id: $appointment_id) {
          __typename
          appointment_type
          doctor_id
          hospital_id
          message
          preferred_timestamp
          user_id
          type
          appointment_status
          booking_timestamp
          _id
          confirm_timestamp
          complete_timestamp
          user_name
          age
          phone
        }
      }`;
    const gqlAPIServiceArguments: any = {
      appointment_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AppointmentsChangedMutation>response.data.appointmentsChanged;
  }
  async CancelAppointment(
    appointment_id: string
  ): Promise<CancelAppointmentMutation> {
    const statement = `mutation CancelAppointment($appointment_id: String!) {
        cancelAppointment(appointment_id: $appointment_id) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      appointment_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CancelAppointmentMutation>response.data.cancelAppointment;
  }
  async UpdateDoctor(data: string): Promise<UpdateDoctorMutation> {
    const statement = `mutation UpdateDoctor($data: String!) {
        updateDoctor(data: $data) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      data
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateDoctorMutation>response.data.updateDoctor;
  }
  async BookAppointment(
    appointment_type: string,
    doctor_id: string,
    user_name: string,
    message?: string,
    age?: number,
    phone?: string
  ): Promise<BookAppointmentMutation> {
    const statement = `mutation BookAppointment($appointment_type: String!, $doctor_id: String!, $message: String, $user_name: String!, $age: Int, $phone: String) {
        bookAppointment(appointment_type: $appointment_type, doctor_id: $doctor_id, message: $message, user_name: $user_name, age: $age, phone: $phone) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      appointment_type,
      doctor_id,
      user_name
    };
    if (message) {
      gqlAPIServiceArguments.message = message;
    }
    if (age) {
      gqlAPIServiceArguments.age = age;
    }
    if (phone) {
      gqlAPIServiceArguments.phone = phone;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <BookAppointmentMutation>response.data.bookAppointment;
  }
  async AddDoctor(
    doctor_id: string,
    speciality: string,
    charge: number
  ): Promise<AddDoctorMutation> {
    const statement = `mutation AddDoctor($doctor_id: ID!, $speciality: String!, $charge: Float!) {
        addDoctor(doctor_id: $doctor_id, speciality: $speciality, charge: $charge) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      doctor_id,
      speciality,
      charge
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddDoctorMutation>response.data.addDoctor;
  }
  async RemoveDoctorLocation(
    doctor_id: string
  ): Promise<RemoveDoctorLocationMutation> {
    const statement = `mutation RemoveDoctorLocation($doctor_id: ID!) {
        removeDoctorLocation(doctor_id: $doctor_id) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {
      doctor_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <RemoveDoctorLocationMutation>response.data.removeDoctorLocation;
  }
  async GetAppointmentsByDoctor(
    doctor_id: string,
    start?: number,
    end?: number
  ): Promise<GetAppointmentsByDoctorQuery> {
    const statement = `query GetAppointmentsByDoctor($doctor_id: String!, $start: Float, $end: Float) {
        getAppointmentsByDoctor(doctor_id: $doctor_id, start: $start, end: $end) {
          __typename
          appointment_type
          doctor_id
          hospital_id
          message
          preferred_timestamp
          user_id
          type
          appointment_status
          booking_timestamp
          _id
          confirm_timestamp
          complete_timestamp
          user_name
          age
          phone
        }
      }`;
    const gqlAPIServiceArguments: any = {
      doctor_id
    };
    if (start) {
      gqlAPIServiceArguments.start = start;
    }
    if (end) {
      gqlAPIServiceArguments.end = end;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAppointmentsByDoctorQuery>response.data.getAppointmentsByDoctor;
  }
  async GetDoctorById(doctor_id: string): Promise<GetDoctorByIdQuery> {
    const statement = `query GetDoctorById($doctor_id: String!) {
        getDoctorById(doctor_id: $doctor_id) {
          __typename
          rating
          charge
          _id
          rating_count
          is_active
          speciality
          email_verified
          name
          phone_number_verified
          phone_number
          email
          views
          image
          location
          schedule {
            __typename
            sun
            mon
            tue
            wed
            thu
            fri
            sat
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      doctor_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetDoctorByIdQuery>response.data.getDoctorById;
  }
  async GetSpecialities(): Promise<GetSpecialitiesQuery> {
    const statement = `query GetSpecialities {
        getSpecialities {
          __typename
          image
          title
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <GetSpecialitiesQuery>response.data.getSpecialities;
  }
  AppointmentsChangedSubListener(
    doctor_id:string
  ): Observable<
    AppointmentsChangedSubSubscription
  > {return API.graphql(
    graphqlOperation(
      `subscription AppointmentsChangedSub($doctor_id: String!) {
        appointmentsChangedSub(doctor_id: $doctor_id) {
          __typename
          appointment_type
          doctor_id
          hospital_id
          message
          preferred_timestamp
          user_id
          type
          appointment_status
          booking_timestamp
          _id
          confirm_timestamp
          complete_timestamp
          user_name
          age
          phone
        }
      }`, {doctor_id:doctor_id}
    )
  ) as Observable<AppointmentsChangedSubSubscription>;
    }
}

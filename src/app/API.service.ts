/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type HospitalInputType = {
  _id: string;
  amenities?: Array<string | null> | null;
  awards?: Array<string | null> | null;
  beds?: number | null;
  description?: string | null;
  established_on?: number | null;
  gallery?: Array<string | null> | null;
  is_active?: boolean | null;
  location?: string | null;
  specialities?: Array<string | null> | null;
  type?: string | null;
  image?: string | null;
  rating?: number | null;
  rating_count?: number | null;
  email?: string | null;
  phone?: string | null;
  schedule?: HospitalScheduleInputType | null;
  address?: string | null;
};

export type HospitalScheduleInputType = {
  sun?: Array<number | null> | null;
  mon?: Array<number | null> | null;
  tue?: Array<number | null> | null;
  wed?: Array<number | null> | null;
  thu?: Array<number | null> | null;
  fri?: Array<number | null> | null;
  sat?: Array<number | null> | null;
};

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
  booking_type: string | null;
  slot: {
    __typename: "AppointmentSlot";
    start: number | null;
    end: number | null;
  } | null;
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

export type UpdateDoctor2Mutation = {
  __typename: "Response";
  code: string;
};

export type AddHospitalMutation = {
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
  booking_type: string | null;
  slot: {
    __typename: "AppointmentSlot";
    start: number | null;
    end: number | null;
  } | null;
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
  reg_council: string | null;
  reg_no: string | null;
  reg_year: number | null;
  degree: string | null;
  appointment_type: string | null;
  slot_duration: number | null;
  morning_limit: number | null;
  evening_limit: number | null;
  hospital_id: string | null;
};

export type GetSpecialitiesQuery = {
  __typename: "Speciality";
  image: string | null;
  title: string;
};

export type CountAppointmentsQuery = {
  __typename: "AppointmentCount";
  booking_count: number | null;
  complete_count: number | null;
  day: string;
};

export type CountAppointmentsByMonthsQuery = {
  __typename: "AppointmentCount";
  booking_count: number | null;
  complete_count: number | null;
  day: string;
};

export type CountAppointmentsByYearQuery = {
  __typename: "AppointmentCount";
  booking_count: number | null;
  complete_count: number | null;
  day: string;
};

export type GetPractitionerQuery = {
  __typename: "Practitioner";
  sub: string;
  email_verified: string;
  phone_number_verified: string;
  phone_number: string;
  email: string;
  name: string | null;
  type: string | null;
};

export type GetHospitalByIdQuery = {
  __typename: "Hospital";
  _id: string;
  amenities: Array<string | null> | null;
  awards: Array<string | null> | null;
  beds: number | null;
  description: string | null;
  established_on: number | null;
  gallery: Array<string | null> | null;
  is_active: boolean | null;
  location: string | null;
  specialities: Array<string | null> | null;
  type: string | null;
  image: string | null;
  rating: number | null;
  rating_count: number | null;
  email: string | null;
  phone: string | null;
  schedule: {
    __typename: "HospitalSchedule";
    sun: Array<number | null> | null;
    mon: Array<number | null> | null;
    tue: Array<number | null> | null;
    wed: Array<number | null> | null;
    thu: Array<number | null> | null;
    fri: Array<number | null> | null;
    sat: Array<number | null> | null;
  } | null;
  address: string | null;
};

export type GetCognitoAttributesByIdQuery = {
  __typename: "CognitoUser";
  Username: string;
  Attributes: Array<{
    __typename: "CogntoAttr";
    Name: string;
    Value: string;
  } | null> | null;
  UserCreateDate: string | null;
  UserLastModifiedDate: string | null;
  Enabled: boolean | null;
  UserStatus: string | null;
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
  booking_type: string | null;
  slot: {
    __typename: "AppointmentSlot";
    start: number | null;
    end: number | null;
  } | null;
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
          booking_type
          slot {
            __typename
            start
            end
          }
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
  async UpdateDoctor2(data: string): Promise<UpdateDoctor2Mutation> {
    const statement = `mutation UpdateDoctor2($data: String!) {
        updateDoctor2(data: $data) {
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
    return <UpdateDoctor2Mutation>response.data.updateDoctor2;
  }
  async AddHospital(data?: HospitalInputType): Promise<AddHospitalMutation> {
    const statement = `mutation AddHospital($data: HospitalInputType) {
        addHospital(data: $data) {
          __typename
          code
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (data) {
      gqlAPIServiceArguments.data = data;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddHospitalMutation>response.data.addHospital;
  }
  async GetAppointmentsByDoctor(
    doctor_id: string,
    start?: number,
    end?: number,
    booking_type?: string
  ): Promise<GetAppointmentsByDoctorQuery> {
    const statement = `query GetAppointmentsByDoctor($doctor_id: String!, $start: Float, $end: Float, $booking_type: String) {
        getAppointmentsByDoctor(doctor_id: $doctor_id, start: $start, end: $end, booking_type: $booking_type) {
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
          booking_type
          slot {
            __typename
            start
            end
          }
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
    if (booking_type) {
      gqlAPIServiceArguments.booking_type = booking_type;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAppointmentsByDoctorQuery>response.data.getAppointmentsByDoctor;
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
  async CountAppointments(
    doctor_id: string,
    is_complete?: boolean
  ): Promise<CountAppointmentsQuery> {
    const statement = `query CountAppointments($doctor_id: ID!, $is_complete: Boolean) {
        countAppointments(doctor_id: $doctor_id, is_complete: $is_complete) {
          __typename
          booking_count
          complete_count
          day
        }
      }`;
    const gqlAPIServiceArguments: any = {
      doctor_id
    };
    if (is_complete) {
      gqlAPIServiceArguments.is_complete = is_complete;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CountAppointmentsQuery>response.data.countAppointments;
  }
  async CountAppointmentsByMonths(
    doctor_id: string,
    is_online?: boolean
  ): Promise<CountAppointmentsByMonthsQuery> {
    const statement = `query CountAppointmentsByMonths($doctor_id: ID!, $is_online: Boolean) {
        countAppointmentsByMonths(doctor_id: $doctor_id, is_online: $is_online) {
          __typename
          booking_count
          complete_count
          day
        }
      }`;
    const gqlAPIServiceArguments: any = {
      doctor_id
    };
    if (is_online) {
      gqlAPIServiceArguments.is_online = is_online;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CountAppointmentsByMonthsQuery>(
      response.data.countAppointmentsByMonths
    );
  }
  async CountAppointmentsByYear(
    doctor_id: string,
    is_online?: boolean
  ): Promise<CountAppointmentsByYearQuery> {
    const statement = `query CountAppointmentsByYear($doctor_id: ID!, $is_online: Boolean) {
        countAppointmentsByYear(doctor_id: $doctor_id, is_online: $is_online) {
          __typename
          booking_count
          complete_count
          day
        }
      }`;
    const gqlAPIServiceArguments: any = {
      doctor_id
    };
    if (is_online) {
      gqlAPIServiceArguments.is_online = is_online;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CountAppointmentsByYearQuery>response.data.countAppointmentsByYear;
  }
  async GetPractitioner(phone: string): Promise<GetPractitionerQuery> {
    const statement = `query GetPractitioner($phone: String!) {
        getPractitioner(phone: $phone) {
          __typename
          sub
          email_verified
          phone_number_verified
          phone_number
          email
          name
          type
        }
      }`;
    const gqlAPIServiceArguments: any = {
      phone
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPractitionerQuery>response.data.getPractitioner;
  }
  async GetHospitalById(hospital_id: string): Promise<GetHospitalByIdQuery> {
    const statement = `query GetHospitalById($hospital_id: ID!) {
        getHospitalById(hospital_id: $hospital_id) {
          __typename
          _id
          amenities
          awards
          beds
          description
          established_on
          gallery
          is_active
          location
          specialities
          type
          image
          rating
          rating_count
          email
          phone
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
          address
        }
      }`;
    const gqlAPIServiceArguments: any = {
      hospital_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetHospitalByIdQuery>response.data.getHospitalById;
  }
  async GetCognitoAttributesById(
    id: string,
    type: string
  ): Promise<GetCognitoAttributesByIdQuery> {
    const statement = `query GetCognitoAttributesById($id: ID!, $type: String!) {
        getCognitoAttributesById(id: $id, type: $type) {
          __typename
          Username
          Attributes {
            __typename
            Name
            Value
          }
          UserCreateDate
          UserLastModifiedDate
          Enabled
          UserStatus
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
      type
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCognitoAttributesByIdQuery>(
      response.data.getCognitoAttributesById
    );
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
          booking_type
          slot {
            __typename
            start
            end
          }
        }
      }`, {doctor_id:doctor_id}
    )
  ) as Observable<AppointmentsChangedSubSubscription>;
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
          reg_council
          reg_no
          reg_year
          degree
          schedule{
            sun{
              morning
              evening
            }
            mon{
              morning
              evening
            }
            tue{
              morning
              evening
            }
            thu{
              morning
              evening
            }
            wed{
              morning
              evening
            }
            thu{
              morning
              evening
            }
            fri{
              morning
              evening
            }
            sat{
              morning
              evening
            }
          }
          appointment_type
          slot_duration
          morning_limit
          evening_limit
          hospital_id
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
}

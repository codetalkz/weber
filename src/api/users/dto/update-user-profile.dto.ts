import { IsString, IsOptional, IsEnum } from "class-validator";

enum EducationalLevel {
    D1,
    D2,
    D3,
    D4,
    S1,
    S2,
    S3,
    PROFESI
}


class UpdateUserProfileDto {
    @IsString()
    @IsOptional()
    place_of_birth!: string;

    @IsString()
    @IsOptional()
    date_of_birth!: string;

    @IsString()
    @IsOptional()
    religion!: string;

    @IsString()
    @IsOptional()
    user_identification_number!: string;

    @IsString()
    @IsOptional()
    phone_number!: string;

    @IsString()
    @IsOptional()
    province!: string;

    @IsString()
    @IsOptional()
    city_regency!: string;

    @IsString()
    @IsOptional()
    subdistrict!: string;

    @IsString()
    @IsOptional()
    village_ward!: string;

    @IsString()
    @IsOptional()
    postal_code!: string;

    @IsString()
    @IsOptional()
    address!: string;

    @IsString()
    @IsOptional()
    province_ktp?: string;

    @IsString()
    @IsOptional()
    address_ktp?: string;

    @IsString()
    @IsOptional()
    postal_code_ktp?: string;

    @IsString()
    @IsOptional()
    village_ward_ktp?: string;

    @IsString()
    @IsOptional()
    subdistrict_ktp?: string;

    @IsString()
    @IsOptional()
    city_regency_ktp?: string;

    @IsString()
    @IsOptional()
    person_name_emergency?: string;

    @IsString()
    @IsOptional()
    email_emergency?: string;

    @IsString()
    @IsOptional()
    phone_number_emergency?: string;

    @IsString()
    @IsOptional()
    relation_with_student!: string;

    @IsString()
    @IsOptional()
    facebook?: string;

    @IsString()
    @IsOptional()
    instagram?: string;

    @IsString()
    @IsOptional()
    tiktok?: string;

    @IsString()
    @IsOptional()
    twitter?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsEnum(EducationalLevel)
    @IsOptional()
    educational_level?: string;
}

export default UpdateUserProfileDto;

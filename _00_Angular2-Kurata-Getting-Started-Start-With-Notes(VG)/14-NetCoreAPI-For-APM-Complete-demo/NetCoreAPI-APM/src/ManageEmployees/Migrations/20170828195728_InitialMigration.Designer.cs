﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ManageEmployees.Data;
using ManageEmployees.Models.Enums;

namespace ManageEmployees.Migrations
{
    [DbContext(typeof(ManageEmployeesContext))]
    [Migration("20170828195728_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ManageEmployees.Models.Entities.Contract", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<int>("EmployeeId");

                    b.Property<DateTime>("EndDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(new DateTime(2017, 8, 28, 13, 57, 28, 70, DateTimeKind.Local));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(120);

                    b.Property<int>("RecordStatus");

                    b.Property<DateTime>("StartDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(new DateTime(2017, 8, 28, 13, 57, 28, 70, DateTimeKind.Local));

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Contract");
                });

            modelBuilder.Entity("ManageEmployees.Models.Entities.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<int>("RecordStatus");

                    b.HasKey("Id");

                    b.ToTable("Department");
                });

            modelBuilder.Entity("ManageEmployees.Models.Entities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("BirthDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(new DateTime(2017, 8, 28, 13, 57, 28, 39, DateTimeKind.Local));

                    b.Property<int>("DepartmentId");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(120);

                    b.Property<int>("JobPosition")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(1);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(120);

                    b.Property<int>("RecordStatus");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("ManageEmployees.Models.Entities.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("LanguageName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<int>("RecordStatus");

                    b.HasKey("Id");

                    b.ToTable("Language");
                });

            modelBuilder.Entity("ManageEmployees.Models.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .HasMaxLength(300);

                    b.Property<string>("ImageUrl")
                        .HasMaxLength(200);

                    b.Property<double>("Price");

                    b.Property<string>("ProductCode")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.Property<int>("RecordStatus");

                    b.Property<DateTime>("ReleaseDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(new DateTime(2017, 8, 28, 13, 57, 28, 70, DateTimeKind.Local));

                    b.Property<double>("StarRating");

                    b.HasKey("Id");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("ManageEmployees.Models.Entities.Contract", b =>
                {
                    b.HasOne("ManageEmployees.Models.Entities.Employee", "Employee")
                        .WithMany("Contracts")
                        .HasForeignKey("EmployeeId");
                });

            modelBuilder.Entity("ManageEmployees.Models.Entities.Employee", b =>
                {
                    b.HasOne("ManageEmployees.Models.Entities.Department", "Department")
                        .WithMany("Employees")
                        .HasForeignKey("DepartmentId");
                });
        }
    }
}

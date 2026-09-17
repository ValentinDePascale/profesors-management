-- CreateTable
CREATE TABLE "profesors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "cuil" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "marital_status" BOOLEAN NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profesors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "CUPOF" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "module" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("CUPOF")
);

-- CreateTable
CREATE TABLE "profesor_subject" (
    "id" SERIAL NOT NULL,
    "profesor_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profesor_subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license" (
    "id" SERIAL NOT NULL,
    "profesor_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "article_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "license_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license_type" (
    "article" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "license_type_pkey" PRIMARY KEY ("article")
);

-- CreateIndex
CREATE UNIQUE INDEX "profesors_dni_key" ON "profesors"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "profesors_cuil_key" ON "profesors"("cuil");

-- CreateIndex
CREATE UNIQUE INDEX "profesors_email_key" ON "profesors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_subject_profesor_id_subject_id_key" ON "profesor_subject"("profesor_id", "subject_id");

-- AddForeignKey
ALTER TABLE "profesor_subject" ADD CONSTRAINT "profesor_subject_profesor_id_fkey" FOREIGN KEY ("profesor_id") REFERENCES "profesors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor_subject" ADD CONSTRAINT "profesor_subject_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("CUPOF") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license" ADD CONSTRAINT "license_profesor_id_fkey" FOREIGN KEY ("profesor_id") REFERENCES "profesors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license" ADD CONSTRAINT "license_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("CUPOF") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license" ADD CONSTRAINT "license_article_code_fkey" FOREIGN KEY ("article_code") REFERENCES "license_type"("article") ON DELETE RESTRICT ON UPDATE CASCADE;

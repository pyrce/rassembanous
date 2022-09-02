-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "nomRole" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "prenom" VARCHAR(50) NOT NULL,
    "login" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "adresse" VARCHAR(100) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "token" VARCHAR(100),
    "id_role" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "categorie" VARCHAR(50) NOT NULL,
    "icon" VARCHAR(50) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evenements" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "id_lieu" INTEGER NOT NULL,
    "id_categorie" INTEGER NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "dateLimit" TIMESTAMP(3) NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "nbPlace" INTEGER NOT NULL,
    "prix" INTEGER NOT NULL,
    "affiche" VARCHAR(50) NOT NULL,

    CONSTRAINT "evenements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partenaire_user" (
    "id" SERIAL NOT NULL,
    "id_partenaire" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "partenaire_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mediatype" (
    "id" SERIAL NOT NULL,
    "libelle" VARCHAR(50) NOT NULL,

    CONSTRAINT "mediatype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "image" VARCHAR(50) NOT NULL,
    "id_event" INTEGER NOT NULL,
    "id_user" INTEGER,
    "id_type" INTEGER NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lieu" (
    "id" SERIAL NOT NULL,
    "nomLieu" VARCHAR(50) NOT NULL,
    "adresse" VARCHAR(50) NOT NULL,

    CONSTRAINT "lieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stands" (
    "id" SERIAL NOT NULL,
    "nomStand" VARCHAR(50) NOT NULL,
    "id_lieu" INTEGER NOT NULL,

    CONSTRAINT "stands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_stand" (
    "id" SERIAL NOT NULL,
    "id_stand" INTEGER,
    "id_event" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "activite" TEXT NOT NULL,

    CONSTRAINT "event_stand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_user" (
    "id" SERIAL NOT NULL,
    "id_event" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "event_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questionnaire" (
    "id" SERIAL NOT NULL,
    "id_event" INTEGER NOT NULL,
    "libelle" VARCHAR(50) NOT NULL,

    CONSTRAINT "questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "id_questionnaire" INTEGER NOT NULL,
    "question" VARCHAR(50) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_user" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_question" INTEGER NOT NULL,
    "stars" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "question_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evenements" ADD CONSTRAINT "evenements_id_lieu_fkey" FOREIGN KEY ("id_lieu") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evenements" ADD CONSTRAINT "evenements_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partenaire_user" ADD CONSTRAINT "partenaire_user_id_partenaire_fkey" FOREIGN KEY ("id_partenaire") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partenaire_user" ADD CONSTRAINT "partenaire_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "evenements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "mediatype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stands" ADD CONSTRAINT "stands_id_lieu_fkey" FOREIGN KEY ("id_lieu") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_stand" ADD CONSTRAINT "event_stand_id_stand_fkey" FOREIGN KEY ("id_stand") REFERENCES "stands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_stand" ADD CONSTRAINT "event_stand_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "evenements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_stand" ADD CONSTRAINT "event_stand_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_user" ADD CONSTRAINT "event_user_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "evenements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_user" ADD CONSTRAINT "event_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questionnaire" ADD CONSTRAINT "questionnaire_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "evenements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_id_questionnaire_fkey" FOREIGN KEY ("id_questionnaire") REFERENCES "questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_user" ADD CONSTRAINT "question_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_user" ADD CONSTRAINT "question_user_id_question_fkey" FOREIGN KEY ("id_question") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

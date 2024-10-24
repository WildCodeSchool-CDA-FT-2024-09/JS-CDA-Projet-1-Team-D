import { AppDataSource } from "../src/data-source";
import { Cat } from "../src/cats/cat.entities";
import { Interest } from "../src/interests/interest.entities";
import { Like } from "../src/likes/like.entities";
import { MeetingPlace } from "../src/meetingPlaces/meetingPlace.entities";

import cats from "../data/cats.json";
import likes from "../data/likes.json";
import interests from "../data/interests.json";
import catInterests from "../data/catInterests.json";
import meetingPlaces from "../data/meeting_place.json";

(async () => {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM interest");
    await queryRunner.query("DELETE FROM like");
    await queryRunner.query("DELETE FROM meeting_place");
    await queryRunner.query("DELETE FROM cat");
    await queryRunner.query("DELETE FROM sqlite_sequence");

    const savedInterests = await Promise.all(
      interests.map(async (jsonEl) => {
        const interest = new Interest();

        interest.id = jsonEl.id;
        interest.name = jsonEl.name;

        return await interest.save();
      })
    );

    await Promise.all(
      cats.map(async (jsonEl) => {
        const cat = new Cat();
        cat.id = jsonEl.id;
        cat.name = jsonEl.name;
        cat.available = jsonEl.available;
        cat.birthday = new Date(jsonEl.birthday);
        cat.breed = jsonEl.breed;
        cat.city = jsonEl.localisation;
        cat.description = jsonEl.description;
        cat.email = jsonEl.email;
        cat.hair_color = jsonEl.hair_color;
        cat.interests = savedInterests.filter((svInt) => {
          const associatedInterests = catInterests.filter(
            (el) => el.id === svInt.id
          );
          const interestName = interests.filter((el) =>
            associatedInterests.some((assoInt) => assoInt.id === el.id)
          );
          return interestName.some((el) => el.name === svInt.name);
        });
        cat.password = jsonEl.password;
        cat.profile_picture = jsonEl.profile_picture;
        cat.role = jsonEl.role;
        cat.sexe = jsonEl.gender;

        return await cat.save();
      })
    );

    await Promise.all(
      likes.map(async (jsonEl) => {
        const like = new Like();

        like.id = jsonEl.id;
        like.cat_id1 = jsonEl.cat_id1;
        like.cat_id2 = jsonEl.cat_id2;
        like.isMatch = jsonEl.match;

        return await like.save();
      })
    );

    await Promise.all(
      meetingPlaces.map(async (jsonEl) => {
        const meetingPlace = new MeetingPlace();

        meetingPlace.id = jsonEl.id;
        meetingPlace.name = jsonEl.name;

        return await meetingPlace.save();
      })
    );

    await queryRunner.commitTransaction();
  } catch (error) {
    console.warn(error);
    await queryRunner.rollbackTransaction();
  }
})();

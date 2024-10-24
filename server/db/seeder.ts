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
      interests.map(async (interestEl) => {
        const interest = new Interest();

        interest.id = interestEl.id;
        interest.name = interestEl.name;

        return await interest.save();
      })
    );

    await Promise.all(
      cats.map(async (catEl) => {
        const cat = new Cat();
        cat.id = catEl.id;
        cat.name = catEl.name;
        cat.available = catEl.available;
        cat.birthday = new Date(catEl.birthday);
        cat.breed = catEl.breed;
        cat.city = catEl.localisation;
        cat.description = catEl.description;
        cat.email = catEl.email;
        cat.hair_color = catEl.hair_color;
        cat.interests = savedInterests.filter((savInt) => {
          const associatedInterests = catInterests.filter(
            (assocIntEl) => assocIntEl.id === savInt.id
          );
          const interestName = interests.filter((interEl) =>
            associatedInterests.some((assoInt) => assoInt.id === interEl.id)
          );
          return interestName.some(
            (interNameEl) => interNameEl.name === savInt.name
          );
        });
        cat.password = catEl.password;
        cat.profile_picture = catEl.profile_picture;
        cat.role = catEl.role;
        cat.sexe = catEl.gender;

        return await cat.save();
      })
    );

    await Promise.all(
      likes.map(async (likeEl) => {
        const like = new Like();

        like.id = likeEl.id;
        like.cat_id1 = likeEl.cat_id1;
        like.cat_id2 = likeEl.cat_id2;
        like.isMatch = likeEl.match;

        return await like.save();
      })
    );

    await Promise.all(
      meetingPlaces.map(async (meetPlace) => {
        const meetingPlace = new MeetingPlace();

        meetingPlace.id = meetPlace.id;
        meetingPlace.name = meetPlace.name;

        return await meetingPlace.save();
      })
    );

    await queryRunner.commitTransaction();
  } catch (error) {
    console.warn(error);
    await queryRunner.rollbackTransaction();
  }
})();

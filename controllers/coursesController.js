import Course from "../models/course.js";
import User from "../models/User.js";

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, playlistId } = req.body;

    const course = await Course.create({
      title,
      description,
      playlistId,
      createdBy: req.user.id,
    });

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const assignCourse = async (req, res, next) => {
  try {
    const { courseId, userId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (course.assignedUsers.some((id) => id.toString() === userId)) {
      return res.status(400).json({ message: "User already assigned" });
    }

    course.assignedUsers.push(userId);
    await course.save();

    user.courses.push({
      courseId: course._id,
      progress: 0,
      completedVideos: [],
    });

    await user.save();

    res.json({ message: "Course assigned successfully" });
  } catch (error) {
    next(error);
  }
};
export const getMyCourses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("courses.courseId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = user.courses.map((course) => ({
      courseId: course.courseId._id,
      title: course.courseId.title,
      description: course.courseId.description,
      progress: course.progress,
      totalVideos: course.courseId.videos.length,
      completedVideos: course.completedVideos.length,
    }));

    res.json({
      courses: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const { courseId, videoId } = req.body;

    const user = await User.findById(req.user.id);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    
    const userCourse = user.courses.find(
      (c) => c.courseId.toString() === courseId
    );

    if (!userCourse) {
      return res.status(404).json({ message: "Course not assigned to user" });
    }

    if (!userCourse.completedVideos.includes(videoId)) {
      userCourse.completedVideos.push(videoId);
    }

    const totalVideos = course.videos.length;
    const completed = userCourse.completedVideos.length;

    userCourse.progress = Math.round((completed / totalVideos) * 100);

    await user.save();

    res.json({
      message: "Progress updated",
      progress: userCourse.progress,
    });

  } catch (error) {
    next(error);
  }
};
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();

    res.json({ courses });

  } catch (error) {
    next(error);
  }
};
export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ course });

  } catch (error) {
    next(error);
  }
};
export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted" });

  } catch (error) {
    next(error);
  }
};
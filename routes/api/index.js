const router = require('express').Router();
// const userRoutes = require('./userRoutes');
// const postRoutes = require('./postRoutes');
// const tagRoutes = require('./tagRoutes');
// const appRoutes = require('./appRoutes');
// const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');

// router.use('/users', userRoutes);
// router.use('/posts', postRoutes);
// router.use('/tags', tagRoutes);
// router.use('/apps', appRoutes);
// router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;

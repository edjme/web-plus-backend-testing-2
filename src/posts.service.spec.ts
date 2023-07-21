import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });
    it('should return all posts if called without options', () => {
        const posts = postsService.findMany();
        expect(posts.length).toBe(4);
      });

    it('should return correct posts for skip and limit options', () => {
      const posts = postsService.findMany({
        skip: 1,
        limit: 2,
      });

      expect(posts.length).toBe(2);
      expect(posts[0]).toEqual({
        id: '2',
        text: 'Post 2',
      });

      expect(posts[1]).toEqual({
        id: '3',
        text: 'Post 3',
      });
    });
  });

  it('should delete a post by given id', () => {
    const created = postsService.create({ text: 'Will be deleted' });
    postsService.delete(created.id);

    const willNotFound = postsService.find(created.id);
    expect(willNotFound).toBe(undefined);
  });

  it('should update post by given id', () => {
    const created = postsService.create({ text: 'Will be updated ' });
    postsService.update(created.id, { text: 'Updated text' });

    const updatedPost = postsService.find(created.id);
    expect(updatedPost).toEqual({
      id: created.id,
      text: 'Updated text',
    });
  });

  it('should not update post and throw error if it was not found', () => {
    postsService.create({ text: 'Will not be updated ' });
    expect(
      () => postsService.update(
        'unreal id',
        { text: 'Updated text' }
      )
    ).toThrow(new Error('Пост не найден'));
  });
});


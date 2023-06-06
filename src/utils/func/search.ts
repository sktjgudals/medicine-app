import prisma from "prisma/prisma";

const postSearchListFunc = async (
  cursor: string | null,
  keyword: string,
  limit: number
) => {
  const postIdList = [];
  if (cursor) {
    const res: any = await prisma.post.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: "postSearch",
            text: {
              query: keyword,
              path: {
                wildcard: "*",
              },
            },
          },
        },
        // {
        //   $sort: {
        //     createdAt: -1,
        //   },
        // },
        {
          $project: {
            id: 1,
          },
        },
        { $skip: 1 },
        { $limit: limit },
      ],
      options: {
        $cursor: { id: { $oid: cursor } },
      },
    });
    for (let i = 0; i < res.length; i++) {
      postIdList.push(res[i]._id.$oid);
    }
    return postIdList;
  } else {
    const res: any = await prisma.post.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: "postSearch",
            text: {
              query: keyword,
              path: {
                wildcard: "*",
              },
            },
          },
        },
        // {
        //   $sort: {
        //     createdAt: -1,
        //   },
        // },
        {
          $project: {
            id: 1,
          },
        },
        { $limit: limit },
      ],
    });
    for (let i = 0; i < res.length; i++) {
      postIdList.push(res[i]._id.$oid);
    }
    return postIdList;
  }
};

export { postSearchListFunc };

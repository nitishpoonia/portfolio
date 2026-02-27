export const posts = [
  {
    slug: "why-flatlist-drops-frames",
    title: "Why FlatList Drops Frames at 5,000 Items (And How to Fix It)",
    description:
      "Deep dive into React Native FlatList performance issues and practical optimization strategies.",
    content: `
FlatList performance issues usually happen because of:

1. Large render batches
2. Improper memoization
3. Expensive item components
4. Nested scroll views

## Solution Strategy

- Tune windowSize
- Reduce maxToRenderPerBatch
- Use React.memo
- Avoid inline functions
- Profile with React DevTools

Performance optimization is about reducing unnecessary renders and memory pressure.
    `,
  },
];

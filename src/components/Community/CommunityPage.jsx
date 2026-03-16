import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { communityRooms, roomRegions } from '../../data/community/rooms';
import { getPostsForRoom } from '../../data/community/posts';
import RoomCard from './RoomCard';
import PostCard from './PostCard';
import PostDetail from './PostDetail';
import WriteButton from './WriteButton';

// 방 목록 뷰
function RoomList({ onSelectRoom }) {
  const [region, setRegion] = useState('all');

  const filtered = region === 'all'
    ? communityRooms
    : communityRooms.filter((r) => r.region === region);

  const totalPosts = communityRooms.reduce((s, r) => s + r.postCount, 0);
  const totalMembers = communityRooms.reduce((s, r) => s + r.memberCount, 0);

  return (
    <div className="space-y-10">
      {/* 섹션 헤더 */}
      <div className="text-center space-y-4">
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
          Travel Community
        </p>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          여행 후기 커뮤니티
        </h1>
        <p className="text-[#9090A8] text-lg max-w-xl mx-auto leading-relaxed">
          실제 여행자들의 생생한 경험을 나누는 공간
        </p>

        {/* 통계 */}
        <div className="flex justify-center gap-8 pt-2">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-white">{(totalPosts / 1000).toFixed(1)}K</p>
            <p className="text-xs text-[#9090A8] flex items-center gap-1 justify-center mt-0.5">
              <MessageSquare size={11} aria-hidden="true" /> 게시글
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-white">{(totalMembers / 1000).toFixed(1)}K</p>
            <p className="text-xs text-[#9090A8] flex items-center gap-1 justify-center mt-0.5">
              <Users size={11} aria-hidden="true" /> 멤버
            </p>
          </div>
        </div>
      </div>

      {/* 지역 필터 */}
      <div
        role="tablist"
        aria-label="지역 필터"
        className="flex gap-2 justify-center flex-wrap"
      >
        {roomRegions.map(({ id, label }) => {
          const isActive = region === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setRegion(id)}
              className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-aurora-1 ${
                isActive ? 'text-white shadow-glow-sm' : 'text-[#9090A8] hover:text-white glass'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="community-filter-pill"
                  className="absolute inset-0 rounded-full bg-aurora-h"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                />
              )}
              {label}
            </button>
          );
        })}
      </div>

      {/* 방 그리드 */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((room, i) => (
            <motion.div
              key={room.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <RoomCard room={room} onClick={() => onSelectRoom(room)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// 방 내부(게시글 목록) 뷰
function RoomView({ room, onBack, onSelectPost }) {
  const posts = getPostsForRoom(room.id);
  const [likes, setLikes] = useState({});

  const toggleLike = (postId) => {
    setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="space-y-8">
      {/* 방 헤더 */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#9090A8] hover:text-white transition-colors duration-200"
          aria-label="커뮤니티 목록으로 돌아가기"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          커뮤니티 홈
        </button>

        {/* 커버 */}
        <div className="relative h-40 rounded-2xl overflow-hidden">
          <img src={room.coverImage} alt={room.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-aurora-h text-white mb-2 inline-block">
              {room.region}
            </span>
            <h2 className="text-2xl font-extrabold text-white">{room.title}</h2>
          </div>
        </div>
        <p className="text-sm text-[#9090A8] leading-relaxed">{room.description}</p>
      </div>

      {/* 게시글 목록 */}
      {posts.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-4xl">✍️</p>
          <p className="text-white font-semibold">아직 게시글이 없어요</p>
          <p className="text-sm text-[#9090A8]">첫 번째 여행 후기를 공유해보세요!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              liked={!!likes[post.id]}
              onLike={() => toggleLike(post.id)}
              onClick={() => onSelectPost(post)}
            />
          ))}
        </div>
      )}

      {/* 글쓰기 버튼 */}
      <WriteButton roomTitle={room.title} />
    </div>
  );
}

// 최상위 커뮤니티 페이지
export default function CommunityPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // 게시글 상세
  if (selectedPost) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-16 lg:py-24">
        <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
      </div>
    );
  }

  // 방 내부
  if (selectedRoom) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-16 lg:py-24">
        <RoomView
          room={selectedRoom}
          onBack={() => setSelectedRoom(null)}
          onSelectPost={setSelectedPost}
        />
      </div>
    );
  }

  // 방 목록
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-16 lg:py-24">
      <RoomList onSelectRoom={setSelectedRoom} />
    </div>
  );
}

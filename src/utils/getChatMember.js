function getChatMember(members, loggedInUserId) {
  for (const member of members) {
    if (member.id !== loggedInUserId) {
      return member;
    }
  }

  return null;
}

export default getChatMember;

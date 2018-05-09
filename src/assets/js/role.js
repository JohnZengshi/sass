export const getRole = function (types, datas) {
  if (datas) {
    for (let i of datas) {
      if (i.role === types) {
        return true
      }
    }   
  }
  return false
}
// export const getDeleteRole = function (A, B, isComputed) { // 操作者，被操作者， 是否是公司人员 
//   if ()
// }
// A 操作者   B 被操作者  true 可以操作    false 不可以操作
// 角色：1 管理员 2 副管理员 3 职员 4 店长 5 店员
// 双角色  1. 超管，店长  2. 副管，店长  3. 职员，店员
// 双角色取值 --> A B 都得这么取值
    // 1. 公司人：抽取--> 超管，副管，职员
    // 2. 店铺人：抽取--> 店长，店员

/*-------删除权限-------*/
// 1. B = 超管 --> false

// 2. B = 副管
//    2.1 A = 超管 --> true
//    2.1 A = 副管 --> false
//    2.1 A = 职员 --> false
//    2.1 A = 店长 --> false
//    2.1 A = 店员 --> false

// 3. B = 职员
//    3.1 A = 超管 --> true
//    3.1 A = 副管 --> true
//    3.1 A = 职员 --> false
//    3.1 A = 店长 --> false
//    3.1 A = 店员 --> false

// 4. B = 店长 --> false

// 5. B = 店员
//    5.1 A = 超管 --> false
//    5.1 A = 副管 --> false
//    5.1 A = 职员 --> false
//    5.1 A = 店长 --> true
//    5.1 A = 店员 --> false


/***************------删除权限公司-------****************/
// 1. B = 超管 --> false

// 2. B = 副管
//    2.1 A = 超管 --> true
//    2.1 A = 副管 --> false
//    2.1 A = 职员 --> false

// 3. B = 职员
//    3.1 A = 超管 --> true
//    3.1 A = 副管 --> true
//    3.1 A = 职员 --> false


/****************-------删除权限店铺-------****************/
// 4. B = 店长 --> false

// 5. B = 店员
//    5.1 A = 超管 --> false
//    5.1 A = 副管 --> false
//    5.1 A = 职员 --> false
//    5.1 A = 店长 --> true
//    5.1 A = 店员 --> false


/*-------编辑资料权限-------*/
// 1. B = 超管 --> false

// 2. B = 副管
//    2.1 A = 超管 --> true
//    2.1 A = 副管 --> false
//    2.1 A = 职员 --> false
//    2.1 A = 店长 --> false
//    2.1 A = 店员 --> false

// 3. B = 职员
//    3.1 A = 超管 --> true
//    3.1 A = 副管 --> true
//    3.1 A = 职员 --> false
//    3.1 A = 店长 --> false
//    3.1 A = 店员 --> false

// 4. B = 店长  ---> ====》和删除不一样
//    3.1 A = 超管 --> true
//    3.1 A = 副管 --> true
//    3.1 A = 职员 --> false
//    3.1 A = 店长 --> false
//    3.1 A = 店员 --> false

// 5. B = 店员
//    5.1 A = 超管 --> false
//    5.1 A = 副管 --> false
//    5.1 A = 职员 --> false
//    5.1 A = 店长 --> true
//    5.1 A = 店员 --> false



/*-------添加应用权限和编辑资料权限一样和添加人员权限一样-------*/
// 1. B = 超管 --> false

// 2. B = 副管
//    2.1 A = 超管 --> true
//    2.1 A = 副管 --> false
//    2.1 A = 职员 --> false
//    2.1 A = 店长 --> false
//    2.1 A = 店员 --> false

// 3. B = 职员
//    3.1 A = 超管 --> true
//    3.1 A = 副管 --> true
//    3.1 A = 职员 --> false
//    3.1 A = 店长 --> false
//    3.1 A = 店员 --> false

// 4. B = 店长
//    3.1 A = 超管 --> true
//    3.1 A = 副管 --> true
//    3.1 A = 职员 --> false
//    3.1 A = 店长 --> false
//    3.1 A = 店员 --> false

// 5. B = 店员
//    5.1 A = 超管 --> false
//    5.1 A = 副管 --> false
//    5.1 A = 职员 --> false
//    5.1 A = 店长 --> true
//    5.1 A = 店员 --> false



/*-------添加应用权限公司-------*/

// 1. B = 超管 --> false

// 2. B = 副管
//    2.1 A = 超管 --> true
//    2.1 A = 副管 --> false
//    2.1 A = 职员 --> false
//    2.1 A = 店长 --> false
//    2.1 A = 店员 --> false

// 3. B = 职员
//    3.1 A = 超管 --> true
//    3.1 A = 副管 --> true
//    3.1 A = 职员 --> false
//    3.1 A = 店长 --> false
//    3.1 A = 店员 --> false


/*-------添加应用权限店铺-------*/

// 4. B = 店长
//    3.1 A = 超管 --> true
//    3.1 A = 副管 --> true
//    3.1 A = 职员 --> false
//    3.1 A = 店长 --> false
//    3.1 A = 店员 --> false

// 5. B = 店员
//    5.1 A = 超管 --> false
//    5.1 A = 副管 --> false
//    5.1 A = 职员 --> false
//    5.1 A = 店长 --> true
//    5.1 A = 店员 --> false
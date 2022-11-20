const Sequelize=require("sequelize");


//User로 모델 만들고 exports함, 모델은 크게 static init 메서드와 static associate메서드로 나뉨, init 메서드는 테이블에 대한 설정, associate 메서드에는 다른 모델과의 관계를 적는다.
module.exports=class User extends Sequelize.Model{
static init(sequelize){
    return super.init({
        name:{
            type:Sequelize.STRING(20),
            allowNull:false,
            unique:true,
        },
        age:{
            type:Sequelize.INTEGER.UNSIGNED,
            allowNull:false,
        },
        married:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
        },
        comment:{
            type:Sequelize.TEXT,
            allowNull:true,
        },
        created_at:{
            type:Sequelize.DATE,
            allowNull:false,
            defaultValue : Sequelize.NOW,
        },

    }, {
        sequelize,   //나중에 model/index.js에서 연결
        timestamps : false, // true이면 createdAt과 updatedAt 칼럼 추가, 자동으로 날짜 칼럼 추가하는 기능 해제
        underscored : false,  // 테이블명과 칼럼명을 camel case가 기본값, 이를 snake case 로 바꾸는 옵션
        modelName:'User',
        tableName:'users',
        paranoid : true,  // true로 설정하면 deletedAt이라는 칼럼이 생김, 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록, 복원을 위해
        charset : 'utf8',
        collate : 'utf8_general_ci'

    });
}

static associate(db){

    db.User.hasMany(db.Comment, {foreignKey : 'commenter', sourceKey:'id'});
}
};